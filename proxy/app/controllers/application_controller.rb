class ApplicationController < ActionController::API
  
  def client
    @client ||= FhirClient.new(ENV["CLIENT_ID"], ENV["CLIENT_SECRET"], ENV["EMR_BASE_URL"])
  end

  def render_401(error_message)
    render status: :unauthorized, json: { error: error_message }
  end

  def valid_patient_check
    if patient_params[:patient] and patient_params[:patient_key]
      stored_patient_key = $redis.get(patient_params[:patient])

      if stored_patient_key != patient_params[:patient_key]
        render_401("Patient Key does not match stored patient key for this Patient ID.")
      end
    else
      render_401("patient and patient_key required.")
    end
  end

  def patient_params
    @patient_params ||= params.permit(
      :patient,
      :patient_key
    )
  end
end
