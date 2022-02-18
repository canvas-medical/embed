import {
  appointmentTypes,
  defaultAppointmentType,
  getAppointmentType,
} from '../../src'

describe('getAppointmentType', () => {
  it('returns Home Visit', () => {
    expect(getAppointmentType('439708006')).toBe(appointmentTypes[0].type)
  })

  it('returns default from null', () => {
    expect(getAppointmentType(null)).toBe(defaultAppointmentType.type)
  })

  it('returns default from incorrect code', () => {
    expect(getAppointmentType('1')).toBe(defaultAppointmentType.type)
  })
})
