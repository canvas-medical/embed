class ScheduleController < ApplicationController

  before_action :valid_patient_check

  def index
    fhir_response = client.get("/Schedule", ENV["FHIR_BASE_URL"])
    render_fhir_response(fhir_response)
  end
end
