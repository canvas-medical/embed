import { hasAllValues } from '../src/utils'

test('Returns a list of error messages', () => {
  // We're purposely putting an incomplete value here to
  // simulate an incomplete configuration.
  // @ts-ignore
  const errorMessages = hasAllValues({})

  expect(
    errorMessages.find(message => message === 'No API URL supplied.')
  ).toBeTruthy()

  expect(
    errorMessages.find(message => message === 'No Bailout URL supplied.')
  ).toBeTruthy()

  expect(
    errorMessages.find(message => message === 'No Location ID supplied.')
  ).toBeTruthy()

  expect(
    errorMessages.find(message => message === 'No Patient ID supplied.')
  ).toBeTruthy()

  expect(
    errorMessages.find(message => message === 'No Patient Key supplied.')
  ).toBeTruthy()

  expect(
    errorMessages.find(message => message === 'No Providers supplied.')
  ).toBeTruthy()
})

test('Returns a missing provider name error', () => {
  const values = {
    api: 'arbitraryString',
    bailoutURL: 'arbitraryString',
    locationId: 'arbitraryString',
    patientId: 'arbitraryString',
    patientKey: 'arbitraryString',
    providers: [
      {
        name: 'arbitraryString',
      },
      {
        id: 'arbitraryString',
      },
    ],
  }

  // We're purposely putting an incomplete value here to
  // simulate an incomplete configuration.
  // @ts-ignore
  const errorMessages = hasAllValues(values)

  expect(errorMessages).toHaveLength(2)

  expect(
    errorMessages.find(
      message => message === 'Provider 1 is missing a Provider ID'
    )
  ).toBeTruthy()

  expect(
    errorMessages.find(
      message => message === 'Provider 2 is missing a Provider Name'
    )
  ).toBeTruthy()
})

test('Returns an empty list of errors', () => {
  const values = {
    api: 'arbitraryString',
    bailoutURL: 'arbitraryString',
    locationId: 'arbitraryString',
    patientId: 'arbitraryString',
    patientKey: 'arbitraryString',
    providers: [
      {
        name: 'arbitraryString',
        id: 'arbitraryString',
      },
    ],
  }

  const errorMessages = hasAllValues(values)
  expect(errorMessages).toHaveLength(0)
})
