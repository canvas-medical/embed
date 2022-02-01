# The main controller of the app. Contains all of the methods used by the other
# controllers to validate the incoming request and return the response from the
# FHIR API.
class ApplicationController < ActionController::API
  unless Rails.env.development?
    rescue_from StandardError,
                with: :render_500
  end

  # Renders a 401 response with the passed in error_message as the body.
  #
  # @param [String] error_message
  def render_401(error_message)
    render status: :unauthorized, json: { error: error_message }
  end

  # Renders a 500 Internal Server Error response and sends a message to Sentry
  # with the error.
  #
  # @param [StandardError] error
  def render_500(error)
    Sentry.capture_exception(error)
    render status: 500,
           json: { error: "Something went wrong, we've been notified of the problem." }
  end

  # Confirms that the passed in patient_key matches the patient_key stored in
  # Redis for the passed in patient.
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

  # Gets the response from the FHIR API for a GET request with the passed in
  # path and params and renders it.
  #
  # @param [String] path
  # @param [ActionController::Parameters] params
  def get_fhir(path, params = {})
    fhir_response = client.get(path, ENV["FHIR_BASE_URL"], params)
    render_fhir_response(fhir_response)
  end

  # Gets the response from the FHIR API for a POST request with the passed in
  # path and body and renders it.
  #
  # @param [String] path
  # @param [String] body
  def post_fhir(path, body = {})
    fhir_response = client.post(path, ENV["FHIR_BASE_URL"], body)
    render_fhir_response(fhir_response)
  end

  # Gets the response from the FHIR API for a PUT request with the passed in
  # path and body and renders it.
  #
  # @param [String] path
  # @param [String] body
  def put_fhir(path, body = {})
    fhir_response = client.put(path, ENV["FHIR_BASE_URL"], body)
    render_fhir_response(fhir_response)
  end

  private

  # Returns the FhirClient used to hit the FHIR API.
  #
  # @return [FhirClient]
  def client
    @client ||= FhirClient.new(ENV["CLIENT_ID"], ENV["CLIENT_SECRET"], ENV["EMR_BASE_URL"])
  end

  # Renders the passed in response from the FHIR API.
  #
  # @param [OAuth2::Response] fhir_response
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

  # Removes all the old headers from the initial Rails response in order to
  # replace them with the headers from the response from the FHIR API.
  def remove_old_headers
    response.headers.each_key do |key|
      response.delete_header(key)
    end
  end

  # Adds the headers from the response from the FHIR API to the Rails response
  # and adds a Last-Modified header to prevent a 304 Not Modified response. It
  # also sets the Content-Length header to the length of the body to prevent a
  # 500 Internal Server Error due to the expected body length not matching the
  # actual body length.
  #
  # @param [OAuth2::Response] fhir_response
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
