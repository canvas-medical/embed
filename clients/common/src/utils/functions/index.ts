import { appointmentTypes, defaultAppointmentType } from '../constants'

export const getAppointmentType = (code: string | null) => {
  if (code) {
    return (
      appointmentTypes.find(item => item.code === code)?.type ||
      defaultAppointmentType.type
    )
  } else {
    return defaultAppointmentType.type
  }
}
