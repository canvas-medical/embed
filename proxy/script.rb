load "#{Rails.root}/lib/fhir_client.rb"

id = ENV["CLIENT_ID"]
secret = ENV["CLIENT_SECRET"]
base_url = ENV["FHIR_BASE_URL"]

client = FHIRClient.new(id, secret, base_url)

#client.get("/Schedule")
