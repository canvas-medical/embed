require "rails_helper"

RSpec.describe AppointmentController, type: :controller do
  let(:patient) { "Patient/cf10ff9d14d0429cb5bb7040611d1a24" }
  let(:patient_key) { "7d22d422-7e11-11ec-90d6-0242ac120003" }

  describe "GET index" do
    context "without patient_key" do
      before do
        get :index, params: { patient: patient }
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
        VCR.use_cassette("controllers/appointment_controller/get_index") do
          $redis.set(patient, patient_key)
          get :index, params: { patient: patient, patient_key: patient_key }
        end
      end

      it "returns a 200 with appointment information" do
        expect(response).to have_http_status(:ok)

        body = JSON.parse(response.body)

        expect(body["resourceType"]).to eq("Bundle")
        expect(body["type"]).to eq("searchset")
        expect(body["total"].to_i).to eq(body["entry"].length)
      end
    end
  end

  describe "POST create" do
    let(:post_body_json) do
      <<~JSON
        {
          "resource": {
              "resourceType": "Appointment",
              "status": "booked",
              "appointmentType": {
                  "coding": [
                      {
                          "system": "http://snomed.info/sct",
                          "code": "448337001",
                          "display": "Telemedicine consultation with patient (procedure)"
                      }
                  ]
              },
              "description": "Weekly check-in.",
              "supportingInformation" : [
                {
                  "reference" : "Location/1"
                }
              ],
              "start": "2021-03-29T13:30:00.000Z",
              "end": "2021-03-29T14:00:00.000Z",
              "participant": [
                  {
                      "actor": {
                          "reference": "Practitioner/c2ff4546548e46ab8959af887b563eab"
                      },
                      "status": "accepted"
                  },
                  {
                      "actor": {
                          "reference": "Patient/cf10ff9d14d0429cb5bb7040611d1a24"
                      },
                      "status": "accepted"
                  }
              ]
          }
        }
      JSON
    end

    context "without patient_key" do
      before do
        post :create, body: post_body_json
      end

      it "returns a 401 with error message" do
        expect(response).to have_http_status(:unauthorized)

        body = JSON.parse(response.body)

        expect(body["error"]).to eq("patient and patient_key required.")
      end
    end

    context "with wrong patient_key" do
      before do
        post :create, params: { patient: patient, patient_key: "fakepatientkey" },
                      body: post_body_json
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
        VCR.use_cassette("controllers/appointment_controller/post_create") do
          $redis.set(patient, patient_key)
          post :create, params: { patient: patient, patient_key: patient_key },
                        body: post_body_json
        end
      end

      it "returns a 201" do
        expect(response).to have_http_status(:created)
      end
    end
  end

  describe "PUT update" do
    let(:id) { "e79835ff-4261-4e39-a399-9861272cfd89" }
    let(:put_body_json) do
      <<~JSON
        {
          "resource": {
              "resourceType": "Appointment",
              "status": "booked",
              "appointmentType": {
                  "coding": [
                      {
                          "system": "http://snomed.info/sct",
                          "code": "448337001",
                          "display": "Telemedicine consultation with patient (procedure)"
                      }
                  ]
              },
              "description": "Weekly check-in.",
              "supportingInformation" : [
                {
                  "reference" : "Location/1"
                }
              ],
              "start": "2021-03-29T13:30:00.000Z",
              "end": "2021-03-29T14:00:00.000Z",
              "participant": [
                  {
                      "actor": {
                          "reference": "Practitioner/c2ff4546548e46ab8959af887b563eab"
                      },
                      "status": "accepted"
                  },
                  {
                      "actor": {
                          "reference": "Patient/cf10ff9d14d0429cb5bb7040611d1a24"
                      },
                      "status": "accepted"
                  }
              ]
          }
        }
      JSON
    end

    context "without patient_key" do
      before do
        put :update, params: { id: id }, body: put_body_json
      end

      it "returns a 401 with error message" do
        expect(response).to have_http_status(:unauthorized)

        body = JSON.parse(response.body)

        expect(body["error"]).to eq("patient and patient_key required.")
      end
    end

    context "with wrong patient_key" do
      before do
        put :update, params: { id: id, patient: patient, patient_key: "fakepatientkey" },
                     body: put_body_json
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
        VCR.use_cassette("controllers/appointment_controller/put_update") do
          $redis.set(patient, patient_key)
          put :update, params: { id: id, patient: patient, patient_key: patient_key },
                       body: put_body_json
        end
      end

      it "returns a 200" do
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
