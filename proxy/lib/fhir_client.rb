require 'oauth2'

class FhirClient
  attr_accessor :client, :token

  def initialize(id, secret, base_url)
    @client = OAuth2::Client.new(
      id,
      secret,
      site: base_url,
      token_url: "auth/token",
      authorize_url: "auth/authorize"
    )

    @token = @client.get_token({
      grant_type: "client_credentials"
    })
  end

  def get(path, base_url = "")
    @token.get(base_url + path, headers: {"Accept": "application/json"})
  end
end
