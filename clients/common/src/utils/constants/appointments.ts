export const defaultAppointmentType = {
  type: 'Office Visit',
  code: '308335008',
}

export const appointmentTypes = [
  {
    type: 'Home Visit',
    code: '439708006',
  },
  {
    type: 'Telemedicine',
    code: '448337001',
  },
  {
    type: 'Lab Visit',
    code: '31108002',
  },
  {
    type: 'Phone Call',
    code: '185317003',
  },
  defaultAppointmentType,
]

export const statuses = {
  booked: 'booked',
  cancelled: 'cancelled',
}
