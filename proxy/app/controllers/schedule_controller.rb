# The controller to hand the /Schedule requests.
class ScheduleController < ApplicationController
  before_action :valid_patient_check

  def index
    get_fhir("/Schedule")
  end
end
