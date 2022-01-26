require "oauth2"

class FhirClient
  attr_accessor :client, :token

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

  def get(path, base_url = "", params = {})
    @token.get(base_url + path, params: params, headers: { "Accept": "application/json" })
  end

  def post(path, base_url = "", body = {})
    @token.post(base_url + path, body: body, headers: { "Accept": "application/json" })
  end

  def put(path, base_url = "", body = {})
    @token.put(base_url + path, body: body, headers: { "Accept": "application/json" })
  end
end
