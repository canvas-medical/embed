import { CallbackType, GeneratedColorsType } from '@canvas-medical/embed-common'

export interface IMainAppProps {
  api: string
  bailoutURL: string
  callbacks: Record<string, CallbackType>
  locationId: string
  patientId: string
  patientKey: string
  providerIds?: string[]
  fontFamily?: string
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
