import {
  AppointmentCodingType,
  GeneratedColorsType,
  HandleErrorType,
  ProvidersType,
  SetTimeSlotsType,
  TimeSlotType,
  SlotType,
} from '@canvas-medical/embed-common'


type OnDateChangeParam = {
  dayOfTimeSlots: { provider: ProvidersType; providerSlots: SlotType[] }[]
  isFirstDateViewed: boolean
  date: Date
}

export interface IMainAppProps {
  api: string
  appointmentBufferInMintues: number
  appointmentCoding: AppointmentCodingType
  bailoutURL: string
  callbacks: {
    onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void
    onClick: (
      e: React.MouseEvent<HTMLButtonElement>,
      config?: Record<string, any>
    ) => void
    onChange: (
      e: React.ChangeEvent<HTMLSelectElement>,
      config?: Record<string, any>
    ) => void
    onError: HandleErrorType
    overrideTimeSlotSelect?: (
      e: React.MouseEvent<HTMLButtonElement>,
      config?: Record<string, any>
    ) => void
    onLoad: (loadTimeInMs: number) => void
    onDateChange: (config: OnDateChangeParam) => void
  }
  daysToFetch: number
  duration: number
  locationId: string
  patientId: string
  patientKey: string
  providerIds: string[]
  preloadBookingDate: { start: string; end: string }
  preloadBookingDuration: string
  preloadProvider: ProvidersType
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
  timeSlot: TimeSlotType
  screen: string
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
  preloadBooking: TimeSlotType
  timeSlot: TimeSlotType
  setTimeSlot: (timeSlot: TimeSlotType) => void
  resetTimeSlot: () => void
  fetchTimeSlots: (setTimeSlots: SetTimeSlotsType) => void
  fetchScheduledAppointment: (
    setAppointmentId: (appointmentId: string) => void
  ) => void
  fetchProviders: () => void
  createAppointment: () => void
  cancelAppointment: (appointmentId: string, onComplete: () => void) => void
  initialized: boolean
  setInitialized: (initialized: boolean) => void
  onLoad: (loadTimeInMs: number) => void
}
