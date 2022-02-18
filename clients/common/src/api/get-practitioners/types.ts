import {
  IFHIRResponse,
  ProvidersType,
  SetLoadingType,
  SetErrorType,
} from '../../utils'

export interface IGetPractitionersResponse extends IFHIRResponse {
  entry: {
    resource: {
      resourceType: string
      id: string
      identifier: {
        system: string
        value: string
      }[]
      name: {
        use: string
        text: string
        family: string
        given: string[]
      }[]
    }
  }[]
}

export type GetPractitionersParamsType = {
  setLoading: SetLoadingType
  setError: SetErrorType
  setProviders: (providers: ProvidersType[]) => void
  api: string
  providerIds: string[]
  patientId: string
  patientKey: string
}

export type ParsePractitionersParmsType = {
  setLoading: SetLoadingType
  setProviders: (providers: ProvidersType[]) => void
  providerIds: string[]
  providers: IGetPractitionersResponse
}
