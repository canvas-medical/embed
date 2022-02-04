# The controller to handle the requests sent by AWS to check app health.
class HealthController < ApplicationController
  # The endpoint that will be pinged by AWS to check app health.
  def index
    remove_old_headers
    add_cors_headers
    render status: :ok
  end
end
