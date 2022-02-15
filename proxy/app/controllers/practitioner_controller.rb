# The controller to hand the /Practitioner requests.
class PractitionerController < ApplicationController
  before_action :valid_patient_check

  def index
    get_fhir("/Practitioner")
  end
end
