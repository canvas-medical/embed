class AppointmentController < ApplicationController

  before_action :valid_patient_check

  def index
    render_fhir_response(client.get("/Appointment", ENV["FHIR_BASE_URL"], params))
  end

  def create
    render_fhir_response(client.post("/Appointment", ENV["FHIR_BASE_URL"], body))
  end

  def update
    render_fhir_response(client.put("/Appointment/#{update_params[:id]}", ENV["FHIR_BASE_URL"], body))
  end

  private

  def body
    request.body.rewind
    body = request.body.read
    request.body.rewind
    body
  end

  def update_params
    params.permit(:id)
  end
end
