class SlotController < ApplicationController

  before_action :valid_patient_check

  def index
    render_fhir_response(client.get("/Slot", ENV["FHIR_BASE_URL"], params))
  end
end
