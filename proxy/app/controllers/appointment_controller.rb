# The controller to handle the /Appointment requests.
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

  # Returns the body of the incoming request. We must rewind before and after to
  # make sure we get the whole body and that anything that uses the body after
  # this without rewinding also gets the whole body.
  #
  # @return [String]
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
