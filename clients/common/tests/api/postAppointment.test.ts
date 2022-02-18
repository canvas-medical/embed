import axios from 'axios'
import {
  getTimeSlots,
  ParsedSlotsType,
  parseSlots,
  postAppointment,
} from '../../src'
import { ParseSlotsResponsesType } from '../../src/api/get-slots/types'
import { SlotsResponse } from './mocks/getSlots'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getSlots', () => {
  it('Makes request', async () => {
    mockedAxios.post.mockImplementation(() => Promise.resolve())

    await postAppointment({
      setScreen: () => {},
      setError: () => {},
      setLoading: () => {},
      api: 'arbitraryString',
      appointmentCoding: {
        system: 'http://some.system',
        code: '123',
        display: "Doctor's Appointment",
      },
      description: 'Routine checkup',
      locationId: '1a2b3c',
      patientId: 'cff72468',
      timeSlot: {
        provider: {
          id: '7aabbaa7',
        },
        start: '2022-02-28T14:45:00.000Z',
        end: '2022-02-28T15:00:00.000Z',
      },
      patientKey: '1234',
    })

    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
  })

  it('Returns an error', async () => {
    mockedAxios.post.mockImplementation(() => Promise.reject())

    await postAppointment({
      setScreen: () => {},
      setError: () => {},
      setLoading: () => {},
      api: 'arbitraryString',
      appointmentCoding: {
        system: 'http://some.system',
        code: '123',
        display: "Doctor's Appointment",
      },
      description: 'Routine checkup',
      locationId: '1a2b3c',
      patientId: 'cff72468',
      timeSlot: {
        provider: {
          id: '7aabbaa7',
        },
        start: '2022-02-28T14:45:00.000Z',
        end: '2022-02-28T15:00:00.000Z',
      },
      patientKey: '1234',
    })

    expect(mockedAxios.post).toHaveBeenCalledTimes(2)
  })
})
