import { IGetAppointmentResponseType } from '../../../src/api/types'

export const AppointmentResponse: IGetAppointmentResponseType = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 3,
  entry: [
    {
      resource: {
        resourceType: 'Appointment',
        id: '1b7cbf1b-ed27-43d5-b9c9-80cb197e3918',
        status: 'booked',
        appointmentType: {
          coding: [
            {
              system: 'http://some.system',
              code: '8675309',
              display: 'Some Display',
            },
          ],
        },
        reasonCode: [
          {
            text: 'test',
          },
        ],
        description: 'test',
        supportingInformation: [
          {
            reference: 'Location/1234234',
          },
        ],
        start: '2022-02-28T02:20:00.000Z',
        end: '2022-02-28T02:40:00.000Z',
        participant: [
          {
            actor: {
              reference: '',
            },
            status: 'accepted',
          },
          {
            actor: {
              reference: 'Patient/fab73482a',
            },
            status: 'accepted',
          },
        ],
      },
    },
    {
      resource: {
        resourceType: 'Appointment',
        id: '77777777-3333-4444-5555-121212121212',
        status: 'booked',
        appointmentType: {
          coding: [
            {
              system: 'http://some.system',
            },
          ],
        },
        reasonCode: [
          {
            text: 'test',
          },
        ],
        description: 'test',
        supportingInformation: [
          {
            reference: '',
          },
        ],
        start: '2022-02-28T02:40:00.000Z',
        end: '2022-02-28T03:00:00.000Z',
        participant: [
          {
            actor: {
              reference: 'Practitioner/17237427a',
            },
            status: 'accepted',
          },
          {
            actor: {
              reference: 'Patient/fab73482a',
            },
            status: 'accepted',
          },
        ],
      },
    },
    {
      resource: {
        resourceType: 'Appointment',
        id: '1b7cbf1b-ed27-43d5-b9c9-80cb197e3918',
        status: 'cancelled',
        appointmentType: {
          coding: [
            {
              system: 'http://some.system',
              code: '8675309',
              display: 'Some Display',
            },
          ],
        },
        reasonCode: [
          {
            text: 'test',
          },
        ],
        description: 'test',
        supportingInformation: [
          {
            reference: 'Location/1234234',
          },
        ],
        start: '2022-02-28T02:20:00.000Z',
        end: '2022-02-28T02:40:00.000Z',
        participant: [
          {
            actor: {
              reference: 'Practitioner/17237427a',
            },
            status: 'accepted',
          },
          {
            actor: {
              reference: 'Patient/fab73482a',
            },
            status: 'accepted',
          },
        ],
      },
    },
  ],
}

export const EmptyAppointmentResponse: IGetAppointmentResponseType = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 0,
  entry: [],
}
