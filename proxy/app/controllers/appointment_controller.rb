class AppointmentController < ApplicationController

  before_action :valid_patient_check

  def index
    get_fhir("/Appointment", params)
  end

  def create
    post_fhir("/Appointment", body)
  end

  def update
    path = "/Appointment/#{update_params[:id]}"
    put_fhir(path, body)
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
