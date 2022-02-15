require "rails_helper"

RSpec.describe PractitionerController, type: :controller do
  describe "GET index" do
    let(:patient) { "Patient/1d545066432b485e83011f6c97f2c00c" }
    let(:patient_key) { "7d22d422-7e11-11ec-90d6-0242ac120003" }

    context "without patient and patient_key" do
      before do
        get :index
      end

      it "returns a 401 with error message" do
        expect(response).to have_http_status(:unauthorized)

        body = JSON.parse(response.body)

        expect(body["error"]).to eq("patient and patient_key required.")
      end
    end

    context "with wrong patient_key" do
      before do
        get :index, params: { patient: patient, patient_key: "fakepatientkey" }
      end

      it "returns a 401 with error message" do
        expect(response).to have_http_status(:unauthorized)

        body = JSON.parse(response.body)

        error_message = "patient_key does not match stored patient key for this patient."
        expect(body["error"]).to eq(error_message)
      end
    end

    context "with correct patient and patient_key" do
      before do
        VCR.use_cassette("controllers/practitioner_controller/get_index") do
          $redis.set(patient, patient_key)
          get :index, params: { patient: patient, patient_key: patient_key }
        end
      end

      it "returns a 200 with practitioner information" do
        expect(response).to have_http_status(:ok)

        body = JSON.parse(response.body)

        expect(body["resourceType"]).to eq("Bundle")
        expect(body["type"]).to eq("searchset")
        expect(body["total"].to_i).to eq(body["entry"].length)
      end
    end

    context "with error" do
      before do
        allow(controller).to receive(:valid_patient_check).and_raise(StandardError)
        $redis.set(patient, patient_key)
        get :index, params: { patient: patient, patient_key: patient_key }
      end

      it "rescues from error and returns 500 response with error message" do
        expect(response).to have_http_status(500)

        body = JSON.parse(response.body)

        expect(body["error"]).to eq("Something went wrong, we've been notified of the problem.")
      end
    end
  end
end
