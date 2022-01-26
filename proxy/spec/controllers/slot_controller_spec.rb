require "rails_helper"

RSpec.describe SlotController, type: :controller do
  describe "GET index" do
    let(:patient) { "Patient/1d545066432b485e83011f6c97f2c00c" }
    let(:patient_key) { "7d22d422-7e11-11ec-90d6-0242ac120003" }
    let(:schedule) { "Schedule/Location.1-Staff.c2ff4546548e46ab8959af887b563eab" }

    context "without patient and patient_key" do
      before do
        get :index, params: { schedule: schedule }
      end

      it "returns a 401 with error message" do
        expect(response).to have_http_status(:unauthorized)

        body = JSON.parse(response.body)

        expect(body["error"]).to eq("patient and patient_key required.")
      end
    end

    context "with wrong patient_key" do
      before do
        get :index, params: { schedule: schedule, patient: patient, patient_key: "fakepatientkey" }
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
        VCR.use_cassette("controllers/slot_controller/get_index") do
          $redis.set(patient, patient_key)
          get :index, params: { schedule: schedule, patient: patient, patient_key: patient_key }
        end
      end

      it "returns a 200 with slot information" do
        expect(response).to have_http_status(:ok)

        body = JSON.parse(response.body)

        expect(body["resourceType"]).to eq("Bundle")
        expect(body["type"]).to eq("searchset")
        expect(body["total"].to_i).to eq(body["entry"].length)
      end
    end
  end
end
