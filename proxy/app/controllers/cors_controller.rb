# The controller to handle the OPTIONS requests for CORS, nocov because Rails
# and RSpec deprecated or got rid of the ways to test OPTIONS requests.
# :nocov:
class CorsController < ApplicationController
  # The endpoint for handling the OPTIONS requests
  def preflight_check
    add_cors_headers
    render status: :ok
  end
end
# :nocov:
