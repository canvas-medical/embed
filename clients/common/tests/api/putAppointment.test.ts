import axios from 'axios'
import { putAppointment } from '../../src'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('putAppointment', () => {
  it('Makes request', async () => {
    mockedAxios.put.mockImplementation(() => Promise.resolve())

    putAppointment({
      onComplete: () => {},
      onError: () => {},
      setLoading: () => {},
      api: 'arbitraryString',
      appointmentCoding: {
        system: 'http://some.system',
        code: '123',
        display: "Doctor's Appointment",
      },
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
      appointmentId: '1234',
    })

    expect(mockedAxios.put).toHaveBeenCalledTimes(1)
  })

  it('Returns an error', async () => {
    mockedAxios.put.mockImplementation(() => Promise.reject())

    putAppointment({
      onComplete: () => {},
      onError: () => {},
      setLoading: () => {},
      api: 'arbitraryString',
      appointmentCoding: {
        system: 'http://some.system',
        code: '123',
        display: "Doctor's Appointment",
      },
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
      appointmentId: '1234',
    })

    expect(mockedAxios.put).toHaveBeenCalledTimes(2)
  })
})
