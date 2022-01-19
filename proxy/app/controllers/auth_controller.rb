class AuthController < ApplicationController

  def authorize
    if authorize_params[:key] == ENV["API_KEY"]
      redis.set(authorize_params[:patient_id], SecureRandom.uuid)
      render json: { patient_key: redis.get(authorize_params[:patient_id]) }
    else
      render status: :unauthorized, json: { error: "You are not authorized to access this resource. Verify that you are passing your key." }
    end
  end

  private

  def authorize_params
    @authorize_params ||= params.permit(
      :key,
      :patient_id
    )
  end

  def redis
    @redis ||= Redis.new(url: ENV["REDIS_URL"])
  end
end
