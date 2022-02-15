import { IMainAppProps } from './types'

// This is a bit gross, but we want to print out specific error messages if the
// embed is not configured.

export const hasAllValues = (values: IMainAppProps) => {
  const errorMessages = []

  if (!values.api) {
    errorMessages.push('No API URL supplied.')
  }

  if (!values.bailoutURL) {
    errorMessages.push('No Bailout URL supplied.')
  }

  if (!values.locationId) {
    errorMessages.push('No Location ID supplied.')
  }

  if (!values.patientId) {
    errorMessages.push('No Patient ID supplied.')
  }

  if (!values.patientKey) {
    errorMessages.push('No Patient Key supplied.')
  }

  if (values.providers) {
    values.providers.forEach((provider, index) => {
      if (!provider.id) {
        errorMessages.push(`Provider ${index + 1} is missing a Provider ID`)
      }
      if (!provider.name) {
        errorMessages.push(`Provider ${index + 1} is missing a Provider Name`)
      }
    })
  } else {
    errorMessages.push('No Proviers supplied.')
  }

  return errorMessages
}
