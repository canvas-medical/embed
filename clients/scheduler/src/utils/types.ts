import { ProvidersType } from '@canvas/embed-common'

export type InitialPropsType = {
  api: string
  bailoutURL: string
  duration: number
  locationId: string
  patientId: string
  patientKey: string
  providers: ProvidersType[]
  brandColor: string
  accentColor: string
}

export type InitializerPropsType = {
  rootId: string
}

export type SchedulerPropsType = {
  shadowRoot: ShadowRoot
}
