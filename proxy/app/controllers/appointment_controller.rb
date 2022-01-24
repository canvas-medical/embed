class AppointmentController < ApplicationController

  before_action :valid_patient_check

  def index
    fhir_response = client.get("/Appointment", ENV["FHIR_BASE_URL"], params)
    render_fhir_response(fhir_response)
  end

  def create
    fhir_response = client.post("/Appointment", ENV["FHIR_BASE_URL"], body)
    render_fhir_response(fhir_response)
  end

  def update
    path = "/Appointment/#{update_params[:id]}"
    fhir_response = client.put(path, ENV["FHIR_BASE_URL"], body)
    render_fhir_response(fhir_response)
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
