class SlotController < ApplicationController

  before_action :valid_patient_check

  def index
    fhir_response = client.get("/Slot", ENV["FHIR_BASE_URL"], params)
    render_fhir_response(fhir_response)
  end
end
