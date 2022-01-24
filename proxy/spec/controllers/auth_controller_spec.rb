require "rails_helper"

RSpec.describe AuthController, type: :controller do
  describe "GET authorize" do

    let(:patient) { "Patient/1d545066432b485e83011f6c97f2c00c" }

    before do
      get :authorize, params: { key: api_key, patient: patient }
    end

    context "with correct API key" do
      let(:api_key) { ENV["API_KEY"] }

      it "returns a 200 with the patient_key" do
        expect(response).to have_http_status(:ok)

        body = JSON.parse(response.body)

        expect(body["patient_key"]).to eq($redis.get(patient))
      end
    end

    context "with fake API key" do
      let(:api_key) { "fakeapikey" }

      it "returns a 401 with error message" do
        expect(response).to have_http_status(:unauthorized)

        body = JSON.parse(response.body)

        expect(body["error"]).to eq("Invalid API Key")
      end
    end
  end
end
