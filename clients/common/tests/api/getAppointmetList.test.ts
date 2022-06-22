import axios from 'axios'
import {
  AppointmentType,
  getAppointmentsList,
  parseAppointments,
} from '../../src'
import {
  AppointmentResponse,
  EmptyAppointmentResponse,
} from './mocks/getAppointments'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getAppointment', () => {
  it('Makes request without providers', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(AppointmentResponse)
    )

    await getAppointmentsList({
      setLoading: () => {},
      onError: () => {},
      setAppointments: () => {},
      setProviders: () => {},
      api: 'arbitraryString',
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
      date: new Date(),
    })

    expect(mockedAxios.get).toHaveBeenCalledTimes(2)
  })

  it('Makes request with providers', async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve(AppointmentResponse)
    )

    await getAppointmentsList({
      setLoading: () => {},
      onError: () => {},
      setAppointments: () => {},
      setProviders: () => {},
      api: 'arbitraryString',
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
      date: new Date(),
      providerIds: ['randomId', 'otherId'],
    })

    // 2 calls from previous test
    expect(mockedAxios.get).toHaveBeenCalledTimes(4)
  })

  it('Returns a list of appointments without providers', () => {
    let parsedAppointments: AppointmentType[] = []

    const setAppointments = (appts: AppointmentType[]) => {
      parsedAppointments = appts
    }

    parseAppointments({
      setLoading: () => {},
      onError: () => {},
      setAppointments,
      setProviders: () => {},
      api: 'arbitraryString',
      appointments: AppointmentResponse,
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
    })

    expect(parsedAppointments.length).toBe(2)
  })

  it('Returns a list of appointments without providers', () => {
    let parsedAppointments: AppointmentType[] = []

    const setAppointments = (appts: AppointmentType[]) => {
      parsedAppointments = appts
    }

    parseAppointments({
      setLoading: () => {},
      onError: () => {},
      setAppointments,
      setProviders: () => {},
      api: 'arbitraryString',
      providerAppointments: [
        {
          providerId: '17237427a',
          appointments: AppointmentResponse,
        },
      ],
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
    })

    expect(parsedAppointments.length).toBe(2)
  })

  it('Returns a list of appointments without providers', () => {
    let parsedAppointments: AppointmentType[] = []

    const setAppointments = (appts: AppointmentType[]) => {
      parsedAppointments = appts
    }

    parseAppointments({
      setLoading: () => {},
      onError: () => {},
      setAppointments,
      setProviders: () => {},
      api: 'arbitraryString',
      providerAppointments: [
        {
          providerId: '17237427a',
          appointments: EmptyAppointmentResponse,
        },
      ],
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
    })

    expect(parsedAppointments.length).toBe(0)
  })
})
