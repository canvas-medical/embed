import axios from 'axios'
import { ProvidersType } from '../../utils'
import {
  GetPractitionersParamsType,
  IGetPractitionersResponse,
  ParsePractitionersParmsType,
} from './types'

export const parsePractitioners = ({
  setProviders,
  providerIds,
  providers,
}: ParsePractitionersParmsType) => {
  const parsedProviders: ProvidersType[] = []

  if (providers.total > 0) {
    providerIds.map(provider => {
      if (!parsedProviders.find(({ id }) => id === provider)) {
        parsedProviders.push({
          id: provider,
          name: providers.entry.find(({ resource }) => resource.id === provider)
            ?.resource.name[0].text,
        })
      }
    })
  }

  setProviders(parsedProviders)
}

export const getPractitioners = async ({
  onError,
  setProviders,
  api,
  providerIds,
  patientId,
  patientKey,
}: GetPractitionersParamsType) => {
  return axios
    .get<IGetPractitionersResponse>(`${api}/Practitioner`, {
      params: {
        patient: patientId,
        patient_key: patientKey,
      },
    })
    .then(response => {
      parsePractitioners({
        setProviders,
        providerIds,
        providers: response.data,
      })
    })
    .catch(e => onError(e, 'Error Fetching Providers'))
}
