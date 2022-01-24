require 'rails_helper'

RSpec.describe ::FhirClient do
  subject do
    described_class.new(ENV["CLIENT_ID"], ENV["CLIENT_SECRET"], ENV["EMR_BASE_URL"])
  end

  describe "#get" do
    it "successfully gets a response for get request" do
      VCR.use_cassette("lib/fhir_client/get") do
        fhir_response = subject.get("/Schedule", ENV["FHIR_BASE_URL"])

        expect(fhir_response.status).to eq(200)
      end
    end
  end

  describe "#post" do
    let(:post_body_json) {
      <<~EOS
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
      EOS
    }

    it "successfully gets a response for post request" do
      VCR.use_cassette("lib/fhir_client/post") do
        fhir_response = subject.post("/Appointment", ENV["FHIR_BASE_URL"], post_body_json)

        expect(fhir_response.status).to eq(201)
      end
    end
  end

  describe "#put" do
    let(:put_body_json) {
      <<~EOS
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
              "description": "Weekly check-in test update",
              "supportingInformation" : [
                {
                  "reference" : "Location/1"
                }
              ],
              "start": "2021-03-16T13:30:00.000Z",
              "end": "2021-03-16T14:00:00.000Z",
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
      EOS
    }

    it "successfully gets a response for put request" do
      VCR.use_cassette("lib/fhir_client/put") do
        fhir_response = subject.put("/Appointment/e79835ff-4261-4e39-a399-9861272cfd89", ENV["FHIR_BASE_URL"], put_body_json)

        expect(fhir_response.status).to eq(200)
      end
    end
  end
end
