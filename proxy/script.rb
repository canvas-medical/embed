load "#{Rails.root}/lib/fhir_client.rb"

id = ENV["CLIENT_ID"]
secret = ENV["CLIENT_SECRET"]
emr_base_url = ENV["EMR_BASE_URL"]
fhir_base_url = ENV["FHIR_BASE_URL"]

client = FHIRClient.new(id, secret, emr_base_url)

pp client.get("/Schedule", fhir_base_url)
