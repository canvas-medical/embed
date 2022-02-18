import { IGetPractitionersResponse } from '../../../src/api/get-practitioners/types'

export const PractitionerResponse: IGetPractitionersResponse = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 3,
  entry: [
    {
      resource: {
        resourceType: 'Practitioner',
        id: '1234567',
        identifier: [
          {
            system: 'http://some.system',
            value: '1111155556',
          },
        ],
        name: [
          {
            use: 'usual',
            text: 'Jane Doe MD',
            family: 'Doe',
            given: ['Jane'],
          },
        ],
      },
    },
    {
      resource: {
        resourceType: 'Practitioner',
        id: '1234568',
        identifier: [
          {
            system: 'http://some.system',
            value: '1111155556',
          },
        ],
        name: [
          {
            use: 'usual',
            text: 'John Doe MD',
            family: 'Doe',
            given: ['John'],
          },
        ],
      },
    },
    {
      resource: {
        resourceType: 'Practitioner',
        id: '1234569',
        identifier: [
          {
            system: 'http://some.system',
            value: '1111155556',
          },
        ],
        name: [
          {
            use: 'usual',
            text: 'Hugh Man MD',
            family: 'Man',
            given: ['Hugh'],
          },
        ],
      },
    },
  ],
}

export const EmptyPractitionerResponse: IGetPractitionersResponse = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 0,
  entry: [],
}
