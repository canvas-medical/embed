require "oauth2"

# The class that handles all of the OAuth authentication and actually makes the
# requests to the FHIR API.
class FhirClient
  attr_accessor :client, :token

  # Sets up the FhirClient by authenticating it with OAuth and getting the token
  # using the client ID, the client secret, and the EMR base URL, which should
  # be stored in the environment variables.
  #
  # @param [String] id
  # @param [String] secret
  # @param [String] base_url
  def initialize(id, secret, base_url)
    @client = OAuth2::Client.new(
      id,
      secret,
      site: base_url,
      token_url: "auth/token",
      authorize_url: "auth/authorize",
      raise_errors: false
    )

    @token = @client.get_token({
                                 grant_type: "client_credentials"
                               })
  end

  # Creates a GET request to the FHIR API and returns the response. The base_url
  # should normally be the FHIR base URL stored in the environment variables.
  #
  # @param [String] path
  # @param [String] base_url
  # @param [ActionController::Parameters] params
  # @return [OAuth2::Response]
  def get(path, base_url = "", params = {})
    @token.get(base_url + path, params: params, headers: { "Accept": "application/json" })
  end

  # Creates a POST request to the FHIR API and returns the response. The base_url
  # should normally be the FHIR base URL stored in the environment variables.
  #
  # @param [String] path
  # @param [String] base_url
  # @param [String] body
  # @return [OAuth2::Response]
  def post(path, base_url = "", body = "")
    @token.post(base_url + path, body: body, headers: { "Accept": "application/json" })
  end

  # Creates a PUT request to the FHIR API and returns the response. The base_url
  # should normally be the FHIR base URL stored in the environment variables.
  #
  # @param [String] path
  # @param [String] base_url
  # @param [String] body
  # @return [OAuth2::Response]
  def put(path, base_url = "", body = "")
    @token.put(base_url + path, body: body, headers: { "Accept": "application/json" })
  end
end
