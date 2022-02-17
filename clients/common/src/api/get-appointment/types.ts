import {
  AppointmentCodingType,
  IFHIRResponse,
  SetErrorType,
  SetLoadingType,
  TimeSlotType,
} from '../../utils'

export interface IGetAppointmentResponseType extends IFHIRResponse {
  entry: [
    {
      resource: {
        resourceType: string
        id: string
        status: string
        appointmentType: {
          coding: AppointmentCodingType
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
        participant: [
          {
            actor: {
              reference: string
            }
            status: string
          }
        ]
      }
    }
  ]
}

export type GetAppointmentParamsType = {
  setLoading: SetLoadingType
  setError: SetErrorType
  setAppointmentId: (args: string) => void
  api: string
  patientId: string
  patientKey: string
  date: Date
  timeSlot: TimeSlotType
}

export type FindAppointmentParamsType = {
  setLoading: SetLoadingType
  setError: SetErrorType
  setAppointmentId: (args: string) => void
  appointments: IGetAppointmentResponseType
  timeSlot: TimeSlotType
}
