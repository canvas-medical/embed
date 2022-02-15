import { GeneratedColorsType, ProvidersType } from '@canvas/embed-common'

export interface IMainAppProps {
  api: string
  bailoutURL: string
  locationId: string
  patientId: string
  patientKey: string
  providers: ProvidersType[]
}

interface IInitializerOnlyProps {
  brandColor: string
  accentColor: string
}

export interface IInitializerProps
  extends IMainAppProps,
    IInitializerOnlyProps {
  rootId: string
}

export interface IAppointmentProps
  extends IMainAppProps,
    IInitializerOnlyProps {
  shadowRoot: any
}

export interface IAppProps extends IMainAppProps {
  colors: GeneratedColorsType
  shadowRoot: any
}

export type AppointmentsViewPropsType = {
  api: string
  colors: GeneratedColorsType
  locationId: string
  patientId: string
  patientKey: string
  providers: ProvidersType[]
  shadowRoot: any
}
