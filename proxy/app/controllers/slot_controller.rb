class SlotController < ApplicationController
  before_action :valid_patient_check

  def index
    get_fhir("/Slot", params)
  end
end
