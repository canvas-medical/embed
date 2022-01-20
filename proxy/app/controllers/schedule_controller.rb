class ScheduleController < ApplicationController

  before_action :valid_patient_check

  def index
    render_fhir_response(client.get("/Schedule", ENV["FHIR_BASE_URL"]))
  end
end
