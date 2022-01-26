class AuthController < ApplicationController
  def authorize
    if authorize_params[:key] == ENV["API_KEY"]
      $redis.set(authorize_params[:patient], SecureRandom.uuid)
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
