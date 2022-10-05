import {
  GeneratedColorsType,
  HandleErrorType,
} from '@canvas-medical/embed-common'
export interface IMainAppProps {
  api: string
  bailoutURL: string
  callbacks: {
    onClick: (
      e: React.MouseEvent<HTMLButtonElement>,
      config?: Record<string, any>
    ) => void
    onChange: (
      e: React.ChangeEvent<HTMLSelectElement>,
      config?: Record<string, any>
    ) => void
    onError: HandleErrorType
    onLoad: (loadTime: number) => void
  }
  locationMap: Map<string, { title: string; address: string; href: string }>
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
