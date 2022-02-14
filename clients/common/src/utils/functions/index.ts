import { appointmentTypes, defaultAppointmentType } from '../constants'

export const getAppointmentType = (code: string) => {
  return (
    appointmentTypes.find(item => item.code === code) || defaultAppointmentType
  )
}
