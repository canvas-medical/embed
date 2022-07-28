import { ProvidersType } from '@canvas-medical/embed-common'
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

  if (!values.providerIds || !values.providerIds.length) {
    errorMessages.push('No Providers supplied.')
  }

  if (!values.returnURL) {
    errorMessages.push('No Return URL supplied.')
  }

  return errorMessages
}

export const findProvider = (
  providerId: string,
  providers: ProvidersType[]
) => {
  return (
    providers.find(({ id }) => id === providerId) || {
      id: providerId,
      name: '',
    }
  )
}
