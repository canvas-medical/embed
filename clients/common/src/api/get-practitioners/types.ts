import {
  IFHIRResponse,
  ProvidersType,
  SetLoadingType,
  HandleErrorType,
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
  onError: HandleErrorType
  setProviders: (providers: ProvidersType[]) => void
  api: string
  providerIds: string[]
  patientId: string
  patientKey: string
  onLoad: () => void
  initialized: boolean
  setInitialized: (isInitialized: boolean) => void
}

export type ParsePractitionersParmsType = {
  setLoading: SetLoadingType
  setProviders: (providers: ProvidersType[]) => void
  providerIds: string[]
  providers: IGetPractitionersResponse
  onLoad: () => void
  initialized: boolean
  setInitialized: (isInitialized: boolean) => void
}
