import { GeneratedColorsType, ProvidersType } from '@canvas/embed-common'

interface iMainAppProps {
  api: string
  bailoutURL: string
  locationId: string
  patientId: string
  patientKey: string
  providers: ProvidersType[]
}

interface iInitializerOnlyProps {
  brandColor: string
  accentColor: string
}

export interface iInitializerProps
  extends iMainAppProps,
    iInitializerOnlyProps {
  rootId: string
}

export interface iAppointmentProps
  extends iMainAppProps,
    iInitializerOnlyProps {
  shadowRoot: any
}

export interface iAppProps extends iMainAppProps {
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
