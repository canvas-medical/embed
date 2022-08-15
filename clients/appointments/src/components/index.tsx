import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import {
  AppointmentType,
  getAppointmentsList,
  Loader,
  putAppointment,
  Error,
  ErrorType,
  HandleErrorType,
  ProvidersType,
} from '@canvas-medical/embed-common'
import { IAppProps } from '../utils'
import { Ui } from './ui'

const noOp = () => {}

const defaultAppointment: AppointmentType = {
  id: '',
  code: '',
  description: '',
  display: '',
  locationId: '',
  providerId: '',
  start: '',
  end: '',
}

export const AppointmentsView = ({
  api,
  colors,
  callbacks,
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
  const [initialized, setInitialized] = useState<boolean>(false)

  const handleCancel = (appointment: AppointmentType) => {
    setAppointmentCancellation({ popoverOpen: true, appointment })
  }

  const handleError: HandleErrorType = (error, msg) => {
    callbacks?.onError?.(error, msg)
    setError(msg)
    setLoading(false)
  }

  const fetchAppointments = useCallback(() => {
    getAppointmentsList({
      setLoading,
      onError: handleError,
      setAppointments,
      setProviders,
      providerIds,
      api,
      patientId,
      patientKey,
      initialized,
      setInitialized,
      onLoad: callbacks?.onLoad || noOp,
    })
  }, [api, patientId, patientKey, providerIds, initialized])

  const afterCancel = () => {
    setAppointmentCancellation({
      popoverOpen: false,
      appointment: defaultAppointment,
    })
    fetchAppointments()
  }

  const onCancel = () => {
    try {
      putAppointment({
        onComplete: afterCancel,
        onError: handleError,
        setLoading,
        appointmentCoding: {
          code: appointmentCancellation.appointment.code,
        },
        locationId:
          appointmentCancellation.appointment.locationId || locationId,
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
    } catch (e) {
      handleError(e as Error, 'Error Cancelling Appointment')
    }
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
