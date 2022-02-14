import { TimeSlotType, TreatmentType } from '../utils'

export const constructAppointmentBody = (
  status: string,
  treatment: TreatmentType,
  reason: string,
  locationId: string,
  timeSlot: TimeSlotType,
  patientId: string
) => {
  return {
    resource: {
      resourceType: 'Appointment',
      status,
      appointmentType: {
        coding: [
          {
            stystem: 'http://snomed.info/sct',
            code: `${treatment.code}`,
            display: treatment.type,
          },
        ],
      },
      description: `${reason}`,
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
}
