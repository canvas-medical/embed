module ApplicationHelper

  def client
    @client ||= FhirClient.new(ENV["CLIENT_ID"], ENV["CLIENT_SECRET"], ENV["EMR_BASE_URL"])
  end

  def render_401(error_message)
    render status: :unauthorized, json: { error: error_message }
  end

  def valid_patient_check
    if patient_params[:patient_id] and patient_params[:patient_key]
      stored_patient_key = ProxyRedis.get(patient_params[:patient_id])

      if stored_patient_key != patient_params[:patient_key]
        render_401("Patient Key does not match stored patient key for this Patient ID.")
      end
    else
      render_401("Patient ID and Patient Key required.")
    end
  end

  def patient_params
    @patient_params ||= params.permit(
      :patient_id,
      :patient_key
    )
  end
end
