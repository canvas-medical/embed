import { AppointmentCodingType, IFHIRResponse } from '../utils'

export interface IGetAppointmentResponseType extends IFHIRResponse {
  entry: {
    resource: {
      resourceType: string
      id: string
      status: string
      appointmentType: {
        coding: AppointmentCodingType[]
      }
      reasonCode: [
        {
          text: string
        }
      ]
      description: string
      supportingInformation: [
        {
          reference: string
        }
      ]
      start: string
      end: string
      participant: {
        actor: {
          reference: string
        }
        status: string
      }[]
    }
  }[]
}
