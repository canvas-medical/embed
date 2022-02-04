# The controller to handle the requests to authenticate the widgets.
class AuthController < ApplicationController
  # The endpoint for getting the patient_key given the API key and a patient.
  def authorize
    if authorize_params[:key] == ENV["API_KEY"]
      $redis.set(authorize_params[:patient], SecureRandom.uuid)
      add_cors_headers
      render json: { patient_key: $redis.get(authorize_params[:patient]) }
    else
      render_401("Invalid API Key")
    end
  end

  private

  def authorize_params
    @authorize_params ||= params.permit(
      :key,
      :patient
    )
  end
end
