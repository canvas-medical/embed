class ApplicationController < ActionController::API
  unless Rails.env.development?
    rescue_from StandardError,
                with: :render_500
  end

  def render_401(error_message)
    render status: :unauthorized, json: { error: error_message }
  end

  def render_500(error)
    Sentry.capture_exception(error)
    render status: 500,
           json: { error: "Something went wrong, we've been notified of the problem." }
  end

  def valid_patient_check
    if patient_params[:patient] && patient_params[:patient_key]
      stored_patient_key = $redis.get(patient_params[:patient])

      if stored_patient_key != patient_params[:patient_key]
        render_401("patient_key does not match stored patient key for this patient.")
      end
    else
      render_401("patient and patient_key required.")
    end
  end

  def get_fhir(path, params = {})
    fhir_response = client.get(path, ENV["FHIR_BASE_URL"], params)
    render_fhir_response(fhir_response)
  end

  def post_fhir(path, body = {})
    fhir_response = client.post(path, ENV["FHIR_BASE_URL"], body)
    render_fhir_response(fhir_response)
  end

  def put_fhir(path, body = {})
    fhir_response = client.put(path, ENV["FHIR_BASE_URL"], body)
    render_fhir_response(fhir_response)
  end

  private

  def client
    @client ||= FhirClient.new(ENV["CLIENT_ID"], ENV["CLIENT_SECRET"], ENV["EMR_BASE_URL"])
  end

  def render_fhir_response(fhir_response)
    remove_old_headers
    add_new_headers(fhir_response)

    response.status = fhir_response.status
    render json: fhir_response.body, content_type: "application/fhir+json; charset=UTF-8"
  end

  def patient_params
    @patient_params ||= params.permit(
      :patient,
      :patient_key
    )
  end

  def remove_old_headers
    response.headers.each_key do |key|
      response.delete_header(key)
    end
  end

  def add_new_headers(fhir_response)
    fhir_response.headers.each do |key, value|
      if key == "content-length"
        response.set_header("content-length", fhir_response.body.length)
      else
        response.set_header(key, value)
      end
    end
    response.set_header("Last-Modified", Time.now.httpdate)
  end
end
