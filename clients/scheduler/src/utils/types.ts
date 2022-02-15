import {
  GeneratedColorsType,
  ProvidersType,
  TimeSlotType,
  TreatmentType,
} from '@canvas/embed-common'

export interface IMainAppProps {
  api: string
  bailoutURL: string
  duration: number
  locationId: string
  patientId: string
  patientKey: string
  providers: ProvidersType[]
  reason: string
  returnURL: string
}

interface IInitializerOnlyProps {
  appointmentTypeCode: string
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
  treatment: TreatmentType
  shadowRoot: any
  date: Date
  setDate: Function
  error: string | string[]
  loading: boolean
  screen: string
  setScreen: Function
  timeSlot: TimeSlotType
  setTimeSlot: Function
  resetTimeSlot: Function
  fetchTimeSlots: Function
  fetchScheduledAppointment: Function
  createAppointment: Function
  cancelAppointment: Function
}
