import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import {
  AppointmentType,
  getAppointmentsList,
  getAppointmentType,
  Loader,
  putAppointment,
  Error,
} from '@canvas-medical/embed-common'
import { AppointmentsViewPropsType } from '../utils'
import { Ui } from './ui'

const defaultAppointment = {
  id: '',
  type: '',
  reason: '',
  start: '',
  end: '',
  provider: {
    name: '',
    id: '',
  },
}

export const AppointmentsView = ({
  api,
  colors,
  locationId,
  patientId,
  patientKey,
  providers,
  shadowRoot,
}: AppointmentsViewPropsType) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | string[]>('')
  const [appointmentCancellation, setAppointmentCancellation] = useState({
    popoverOpen: false,
    appointment: defaultAppointment,
  })

  const [appointments, setAppointments] = useState<AppointmentType[]>([])

  const handleCancel = (appointment: AppointmentType) => {
    setAppointmentCancellation({ popoverOpen: true, appointment })
  }

  const fetchAppointments = useCallback(() => {
    getAppointmentsList(
      setLoading,
      setError,
      setAppointments,
      providers,
      api,
      patientId,
      patientKey
    )
  }, [api, patientId, patientKey, providers])

  const afterCancel = () => {
    setAppointmentCancellation({
      popoverOpen: false,
      appointment: defaultAppointment,
    })
    fetchAppointments()
  }

  const onCancel = () => {
    putAppointment(
      afterCancel,
      setError,
      setLoading,
      getAppointmentType(appointmentCancellation.appointment.type),
      appointmentCancellation.appointment.reason,
      locationId,
      {
        start: appointmentCancellation.appointment.start,
        end: appointmentCancellation.appointment.end,
        provider: appointmentCancellation.appointment.provider,
      },
      patientId,
      patientKey,
      api,
      appointmentCancellation.appointment.id
    )
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
      colors={colors}
      onCancel={onCancel}
      onKeep={onKeep}
      handleCancel={handleCancel}
      shadowRoot={shadowRoot}
      appointmentCancellation={appointmentCancellation}
    />
  )
}
