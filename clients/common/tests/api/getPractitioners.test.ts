import axios from 'axios'
import { ProvidersType } from '../../src'
import {
  getPractitioners,
  parsePractitioners,
} from '../../src/api/get-practitioners'
import {
  EmptyPractitionerResponse,
  PractitionerResponse,
} from './mocks/getPractitoners'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getPractitioners', () => {
  it('Makes requrest without providers', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(PractitionerResponse)
    )

    await getPractitioners({
      setLoading: () => {},
      setError: () => {},
      setProviders: () => {},
      api: 'arbitraryString',
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
      providerIds: [''],
    })

    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })

  it('Parses practitoners', () => {
    let parsedProviders: ProvidersType[] = []

    const setProviders = (args: ProvidersType[]) => {
      parsedProviders = args
    }

    parsePractitioners({
      setLoading: () => {},
      setProviders,
      providerIds: ['1234567', '1234568'],
      providers: PractitionerResponse,
    })

    expect(parsedProviders.length).toBe(2)
  })

  it('Handles an empty list of practitoners', () => {
    let parsedProviders: ProvidersType[] = []

    const setProviders = (args: ProvidersType[]) => {
      parsedProviders = args
    }

    parsePractitioners({
      setLoading: () => {},
      setProviders,
      providerIds: [],
      providers: EmptyPractitionerResponse,
    })

    expect(parsedProviders.length).toBe(0)
  })

  it('Handles a duplicate providerId', () => {
    let parsedProviders: ProvidersType[] = []

    const setProviders = (args: ProvidersType[]) => {
      parsedProviders = args
    }

    parsePractitioners({
      setLoading: () => {},
      setProviders,
      providerIds: ['1234567', '1234567', '1234568'],
      providers: PractitionerResponse,
    })

    expect(parsedProviders.length).toBe(2)
  })
})
