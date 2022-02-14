import {
  GeneratedColorsType,
  ProvidersType,
  TimeSlotType,
  TreatmentType,
} from '@canvas/embed-common'

interface iMainAppProps {
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

interface iInitializerOnlyProps {
  appointmentTypeCode: string
  brandColor: string
  accentColor: string
}

export interface iInitializerProps
  extends iMainAppProps,
    iInitializerOnlyProps {
  rootId: string
}

export interface iSchedulerProps extends iMainAppProps, iInitializerOnlyProps {
  shadowRoot: any
}

export interface iAppContext extends iMainAppProps {
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
