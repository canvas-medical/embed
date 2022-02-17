import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import {
  AppointmentType,
  getAppointmentsList,
  getAppointmentType,
  Loader,
  putAppointment,
  Error,
  ErrorType,
  ProvidersType,
} from '@canvas-medical/embed-common'
import { IAppProps } from '../utils'
import { Ui } from './ui'

const defaultAppointment: AppointmentType = {
  id: '',
  code: '',
  display: '',
  locationId: '',
  providerId: '',
  start: '',
  end: '',
}

export const AppointmentsView = ({
  api,
  colors,
  locationId,
  patientId,
  patientKey,
  providerIds,
  shadowRoot,
}: IAppProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ErrorType>()
  const [appointmentCancellation, setAppointmentCancellation] = useState({
    popoverOpen: false,
    appointment: defaultAppointment,
  })

  const [appointments, setAppointments] = useState<AppointmentType[]>([])
  const [providers, setProviders] = useState<ProvidersType[]>([])

  const handleCancel = (appointment: AppointmentType) => {
    setAppointmentCancellation({ popoverOpen: true, appointment })
  }

  const fetchAppointments = useCallback(() => {
    getAppointmentsList({
      setLoading,
      setError,
      setAppointments,
      setProviders,
      providerIds,
      api,
      patientId,
      patientKey,
    })
  }, [api, patientId, patientKey, providerIds])

  const afterCancel = () => {
    setAppointmentCancellation({
      popoverOpen: false,
      appointment: defaultAppointment,
    })
    fetchAppointments()
  }

  const onCancel = () => {
    putAppointment({
      onComplete: afterCancel,
      setError,
      setLoading,
      appointmentCoding: {
        code: getAppointmentType(appointmentCancellation.appointment.code),
      },
      locationId: appointmentCancellation.appointment.locationId || locationId,
      timeSlot: {
        start: appointmentCancellation.appointment.start,
        end: appointmentCancellation.appointment.end,
        provider: {
          id: appointmentCancellation.appointment.providerId,
        },
      },
      patientId,
      patientKey,
      api,
      appointmentId: appointmentCancellation.appointment.id,
    })
  }

  const onKeep = () => {
    setAppointmentCancellation({
      popoverOpen: false,
      appointment: defaultAppointment,
    })
  }

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  if (loading) {
    return <Loader colors={colors} />
  }

  if (error && error.length) {
    return <Error errorMessages={error} />
  }

  return (
    <Ui
      appointments={appointments}
      providers={providers}
      colors={colors}
      onCancel={onCancel}
      onKeep={onKeep}
      handleCancel={handleCancel}
      shadowRoot={shadowRoot}
      appointmentCancellation={appointmentCancellation}
    />
  )
}
