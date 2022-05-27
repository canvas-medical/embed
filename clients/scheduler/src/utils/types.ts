import {
  AppointmentCodingType,
  GeneratedColorsType,
  ProvidersType,
  SetTimeSlotsType,
  TimeSlotType,
} from '@canvas-medical/embed-common'

export interface IMainAppProps {
  api: string
  appointmentBufferInMintues: number
  appointmentCoding: AppointmentCodingType
  bailoutURL: string
  daysToFetch: number
  duration: number
  locationId: string
  patientId: string
  patientKey: string
  providerIds: string[]
  description: string
  returnURL: string
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

export interface ISchedulerProps extends IMainAppProps, IInitializerOnlyProps {
  shadowRoot: any
}

export interface IAppContext extends IMainAppProps {
  colors: GeneratedColorsType
  shadowRoot: any
  date: Date
  setDate: (date: Date) => void
  error: string | string[]
  loading: boolean
  screen: string
  setScreen: (screen: string) => void
  providers: ProvidersType[]
  setProviders: (providers: ProvidersType[]) => void
  timeSlot: TimeSlotType
  setTimeSlot: (timeSlot: TimeSlotType) => void
  resetTimeSlot: () => void
  fetchTimeSlots: (setTimeSlots: SetTimeSlotsType) => void
  fetchScheduledAppointment: (
    setAppointmentId: (appointmentId: string) => void
  ) => void
  createAppointment: () => void
  cancelAppointment: (appointmentId: string, onComplete: () => void) => void
}
