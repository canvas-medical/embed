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
            stystem: appointmentCoding.system || 'http://snomed.info/sct',
            code: appointmentCoding.code || '',
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
      start: new Date(timeSlot.start).toISOString(),
      end: new Date(timeSlot.end).toISOString(),
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
