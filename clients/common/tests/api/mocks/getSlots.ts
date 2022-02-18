import { IGetSlotsResponse } from '../../../src/api/get-slots/types'

export const SlotsResponse: IGetSlotsResponse = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 2,
  entry: [
    {
      resource: {
        resourceType: 'Slot',
        schedule: {
          reference: 'Schedule/Location.1234-Staff.1234567',
        },
        status: 'free',
        start: '2022-03-28T10:40:00-08:00',
        end: '2022-03-28T11:00:00-08:00',
      },
    },
    {
      resource: {
        resourceType: 'Slot',
        schedule: {
          reference: 'Schedule/Location.1234-Staff.1234567',
        },
        status: 'free',
        start: '2022-03-28T11:00:00-08:00',
        end: '2022-03-28T11:20:00-08:00',
      },
    },
    {
      resource: {
        resourceType: 'Slot',
        schedule: {
          reference: 'Schedule/Location.1234-Staff.1234567',
        },
        status: 'free',
        start: '2022-03-30T11:00:00-08:00',
        end: '2022-03-30T11:20:00-08:00',
      },
    },
    {
      resource: {
        resourceType: 'Slot',
        schedule: {
          reference: 'Schedule/Location.1234-Staff.1234567',
        },
        status: 'free',
        start: '2022-03-30T11:20:00-08:00',
        end: '2022-03-30T11:40:00-08:00',
      },
    },
  ],
}
