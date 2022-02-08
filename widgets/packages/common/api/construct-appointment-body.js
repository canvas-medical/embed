export const constructAppointmentBody = (
  status,
  appointmentTypeCode,
  treatment,
  reason,
  locationId,
  timeSlot,
  patientId
) => {
  return {
    resource: {
      resourceType: 'Appointment',
      status,
      appointmentType: {
        coding: [
          {
            stystem: 'http://snomed.info/sct',
            code: `${appointmentTypeCode}`,
            display: treatment,
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
