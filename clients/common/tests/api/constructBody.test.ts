import { statuses } from '../../src'
import { constructBody } from '../../src/api/construct-body'

const fullParamsResult = JSON.stringify({
  resource: {
    resourceType: 'Appointment',
    status: statuses.booked,
    appointmentType: {
      coding: [
        {
          system: 'http://some.system',
          code: '123',
          display: "Doctor's Appointment",
        },
      ],
    },
    description: 'Routine checkup',
    supportingInformation: [
      {
        reference: 'Location/1a2b3c',
      },
    ],
    start: '2022-02-28T14:45:00.000Z',
    end: '2022-02-28T15:00:00.000Z',
    participant: [
      {
        actor: {
          reference: 'Practitioner/7aabbaa7',
        },
        status: 'accepted',
      },
      {
        actor: {
          reference: 'Patient/cff72468',
        },
        status: 'accepted',
      },
    ],
  },
})

const partialParamsResult = JSON.stringify({
  resource: {
    resourceType: 'Appointment',
    status: statuses.booked,
    appointmentType: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          display: 'Display only',
        },
      ],
    },
    supportingInformation: [
      {
        reference: 'Location/1a2b3c',
      },
    ],
    start: '2022-02-28T14:45:00.000Z',
    end: '2022-02-28T15:00:00.000Z',
    participant: [
      {
        actor: {
          reference: 'Practitioner/7aabbaa7',
        },
        status: 'accepted',
      },
      {
        actor: {
          reference: 'Patient/cff72468',
        },
        status: 'accepted',
      },
    ],
  },
})

test('Creates correct post/put body with all inputs', () => {
  const body = constructBody({
    status: statuses.booked,
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
  })

  expect(body).toBe(fullParamsResult)
})

test('Creates correct post/put body with missing coding inputs', () => {
  const body = constructBody({
    status: statuses.booked,
    appointmentCoding: {
      display: 'Display only',
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
  })

  expect(body).toBe(partialParamsResult)
})
