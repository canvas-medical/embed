import axios from 'axios'
import { findAppointment, getScheduledAppointment } from '../../src'
import { AppointmentResponse } from './mocks/getAppointments'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getAppointment', () => {
  it('Makes request', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(AppointmentResponse)
    )

    await getScheduledAppointment({
      setLoading: () => {},
      onError: () => {},
      setAppointmentId: () => {},
      api: 'arbitraryString',
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
      date: new Date(),
      timeSlot: {
        start: '2022-02-28T02:40:00.000Z',
        end: '2022-02-28T03:00:00.000Z',
        provider: {
          id: '17237427a',
        },
      },
    })

    expect(mockedAxios.get).toHaveBeenCalled()
  })

  it('Returns an appointment', () => {
    let appointmentId = ''

    const setAppointmentId = (args: string) => {
      appointmentId = args
    }

    findAppointment({
      setLoading: () => {},
      onError: () => {},
      setAppointmentId,
      appointments: AppointmentResponse,
      timeSlot: {
        start: '2022-02-28T02:40:00.000Z',
        end: '2022-02-28T03:00:00.000Z',
        provider: {
          id: '17237427a',
        },
      },
    })

    expect(appointmentId).toBe('77777777-3333-4444-5555-121212121212')
  })

  it('Returns an error', () => {
    let error: string | string[] = ''

    const onError = (error: any, errorString: string | string[]) => {
      error = errorString
    }

    findAppointment({
      setLoading: () => {},
      onError,
      setAppointmentId: () => {},
      appointments: AppointmentResponse,
      timeSlot: {
        start: '2022-02-28T03:40:00.000Z',
        end: '2022-02-28T04:00:00.000Z',
        provider: {
          id: '17237427a',
        },
      },
    })

    expect(error).toBe('Error Fetching Appointment')
  })
})
