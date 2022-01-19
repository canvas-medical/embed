class ScheduleController < ApplicationController

  before_action :valid_patient_check

  def index
    render json: client.get("/Schedule", ENV["FHIR_BASE_URL"])
  end
end
