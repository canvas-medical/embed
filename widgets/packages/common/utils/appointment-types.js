const defaultAppointmentType = {
  type: 'Office Visit',
  code: '308335008',
}

const appointmentTypes = [
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

export const getAppointmentType = code => {
  return (
    appointmentTypes.find(item => item.code === code) || defaultAppointmentType
  )
}
