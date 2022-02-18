import axios from 'axios'
import {
  findAppointment,
  getTimeSlots,
  ParsedSlotsType,
  parseSlots,
} from '../../src'
import { ParseSlotsResponsesType } from '../../src/api/get-slots/types'
import { SlotsResponse } from './mocks/getSlots'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getSlots', () => {
  it('Makes request', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve(SlotsResponse))

    await getTimeSlots({
      setLoading: () => {},
      setError: () => {},
      setTimeSlots: () => {},
      api: 'arbitraryString',
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
      date: new Date('2022-02-28T02:20:00.000Z'),
      duration: 20,
      locationId: '1234',
      providerIds: ['1234567', '12345678'],
      setProviders: () => {},
    })

    expect(mockedAxios.get).toHaveBeenCalledTimes(2)
  })

  it('Returns an error', async () => {
    mockedAxios.get.mockImplementation(() => Promise.reject(SlotsResponse))

    getTimeSlots({
      setLoading: () => {},
      setError: () => {},
      setTimeSlots: () => {},
      api: 'arbitraryString',
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
      date: new Date('2022-03-28T10:00:00.000Z'),
      duration: 20,
      locationId: '1234',
      providerIds: ['1234567', '12345678'],
      setProviders: () => {},
    })

    expect(mockedAxios.get).toHaveBeenCalledTimes(5)
  })

  it('Returns slots', () => {
    let parsedSlots = []

    const setTimeSlots = (timeSlots: ParsedSlotsType[]) => {
      parsedSlots = timeSlots
    }

    const responses: ParseSlotsResponsesType = [
      {
        providerId: '1234567',
        slots: SlotsResponse,
      },
    ]

    parseSlots({
      setLoading: () => {},
      responses,
      date: new Date('2022-03-28T10:00:00.000Z'),
      setTimeSlots,
      api: 'arbitraryString',
      patientId: 'fab73482a',
      patientKey: 'arbitraryString',
      providerIds: ['1234567', '12345678'],
      setProviders: () => {},
      setError: () => {},
    })

    expect(parsedSlots.length).toBe(1)
  })
})
