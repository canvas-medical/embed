import axios from 'axios'
import { AppointmentType, formatDateForAPI, statuses } from '../../utils'
import { getPractitioners } from '../get-practitioners'
import { IGetAppointmentResponseType } from '../types'
import {
  GetAppointmentsListParamsType,
  ParseAppointmentsParamsType,
} from './types'

const parseAppointments = ({
  setLoading,
  setError,
  setAppointments,
  setProviders,
  api,
  appointments,
  providerAppointments,
  patientId,
  patientKey,
}: ParseAppointmentsParamsType) => {
  const parsedAppointments: AppointmentType[] = []
  const parsedProviders: string[] = []

  if (providerAppointments) {
    providerAppointments.forEach(response => {
      if (response.appointments.total > 0) {
        response.appointments.entry.map(({ resource }) => {
          if (resource.status !== statuses.cancelled) {
            parsedAppointments.push({
              id: resource.id,
              code: resource.appointmentType.coding[0].code || '',
              display: resource.appointmentType.coding[0].display || '',
              locationId:
                resource.supportingInformation[0].reference.split('/')[1] || '',
              providerId: response.providerId,
              start: resource.start,
              end: resource.end,
            })
          }
        })
      }
    })
  } else if (appointments && appointments.total > 0) {
    appointments.entry.map(({ resource }) => {
      if (resource.status !== statuses.cancelled) {
        const providerId =
          resource.participant
            .find(({ actor }) => actor.reference.includes('Practitioner'))
            ?.actor.reference.split('/')[1] || ''

        parsedAppointments.push({
          id: resource.id,
          code: resource.appointmentType.coding[0].code || '',
          display: resource.appointmentType.coding[0].display || '',
          locationId:
            resource.supportingInformation[0].reference.split('/')[1] || '',
          providerId,
          start: resource.start,
          end: resource.end,
        })

        parsedProviders.push(providerId)
      }
    })
  }

  setAppointments(parsedAppointments)
  getPractitioners({
    setLoading,
    setError,
    setProviders,
    api,
    providerIds: parsedProviders,
    patientId,
    patientKey,
  })
}

export const getAppointmentsList = ({
  setLoading,
  setError,
  setAppointments,
  setProviders,
  api,
  date,
  patientId,
  patientKey,
  providerIds,
}: GetAppointmentsListParamsType) => {
  const queryDate = formatDateForAPI(date || new Date())

  setLoading(true)

  if (providerIds) {
    Promise.all(
      providerIds.map(providerId => {
        return axios
          .get<IGetAppointmentResponseType>(`${api}/Appointment`, {
            params: {
              practitioner: providerId,
              patient: patientId,
              patient_key: patientKey,
              date: `ge${formatDateForAPI(new Date())}`,
            },
          })
          .then(response => {
            return { providerId, appointments: response.data }
          })
      })
    )
      .then(responses =>
        parseAppointments({
          setLoading,
          setError,
          setAppointments,
          setProviders,
          api,
          providerAppointments: responses,
          patientId,
          patientKey,
        })
      )
      .catch(() => setError('Error Fetching Appointments'))
  } else {
    return axios
      .get(`${api}/Appointment`, {
        params: {
          patient: patientId,
          patient_key: patientKey,
          date: `ge${formatDateForAPI(new Date())}`,
        },
      })
      .then(response => {
        parseAppointments({
          setLoading,
          setError,
          setAppointments,
          setProviders,
          api,
          appointments: response.data,
          patientId,
          patientKey,
        })
      })
      .catch(() => setError('Error Fetching Appointments'))
  }
}
