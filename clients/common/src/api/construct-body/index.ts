import { toISOString } from '../../utils'
import { ConstructBodyParamsType } from './types'

export const constructBody = ({
  status,
  appointmentCoding,
  description,
  locationId,
  timeSlot,
  patientId,
}: ConstructBodyParamsType) => {
  const body = {
    resource: {
      resourceType: 'Appointment',
      status,
      appointmentType: {
        coding: [
          {
            system: appointmentCoding.system || 'http://snomed.info/sct',
            code: appointmentCoding.code,
            display: appointmentCoding.display,
          },
        ],
      },
      description,
      supportingInformation: [
        {
          reference: `Location/${locationId}`,
        },
      ],
      start: toISOString(timeSlot.start),
      end: toISOString(timeSlot.end),
      participant: [
        {
          actor: {
            reference: `Practitioner/${timeSlot.provider.id}`,
          },
          status: 'accepted',
        },
        {
          actor: {
            reference: `Patient/${patientId}`,
          },
          status: 'accepted',
        },
      ],
    },
  }

  return JSON.stringify(body)
}
