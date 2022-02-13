import { h, render } from 'preact'
import { StyleSheetManager } from 'styled-components'
import {
  css,
  Error,
  generateColors,
  getAppointmentType,
} from '@canvas/embed-common'
import { ContextWrapper } from './hooks'
import { App } from './App'
import { hasAllValues, iInitializerProps, iSchedulerProps } from './utils'

export const Scheduler = (props: iSchedulerProps) => {
  const {
    api,
    appointmentTypeCode,
    bailoutURL,
    duration,
    locationId,
    patientId,
    patientKey,
    providers,
    reason,
    returnURL,
    brandColor,
    accentColor,
    shadowRoot,
  } = props
  const colors = generateColors(brandColor, accentColor)
  const treatment = getAppointmentType(appointmentTypeCode)
  const allValuesProvided = hasAllValues(props)

  return (
    // Ignoring type mismatch error on target - ShadowRoot is an acceptable type
    // @ts-ignore
    <StyleSheetManager target={shadowRoot}>
      {!allValuesProvided.length ? (
        <ContextWrapper
          values={{
            api,
            bailoutURL,
            duration,
            locationId,
            patientId,
            patientKey,
            providers,
            colors,
            reason,
            returnURL,
            shadowRoot,
            treatment,
            loading: false,
            screen: 'SELECT',
            timeSlot: {
              start: '',
              end: '',
              provider: {
                id: '',
                name: '',
              },
            },
            setTimeSlot: () => {},
            resetTimeSlot: () => {},
            date: new Date(),
            setDate: () => {},
            fetchTimeSlots: () => {},
            fetchScheduledAppointment: () => {},
            createAppointment: () => {},
            cancelAppointment: () => {},
          }}
        >
          <App />
        </ContextWrapper>
      ) : (
        <Error errorMessage={allValuesProvided} />
      )}
    </StyleSheetManager>
  )
}

export const init = ({
  api,
  appointmentTypeCode,
  bailoutURL,
  duration,
  locationId,
  patientId,
  patientKey,
  providers,
  reason,
  returnURL,
  rootId,
  brandColor,
  accentColor,
}: iInitializerProps) => {
  const appRoot = document.querySelector(`#${rootId}`)

  if (!appRoot) {
    console.error('App root could not be found. Check your rootId')
    return null
  }

  appRoot.attachShadow({
    mode: 'open',
  })

  if (!appRoot.shadowRoot) {
    console.error('Shadow root could not be attached')
    return null
  }

  const styleTag = document.createElement('style')
  styleTag.innerHTML = css
  appRoot.shadowRoot.appendChild(styleTag)

  render(
    <Scheduler
      api={api}
      appointmentTypeCode={appointmentTypeCode}
      bailoutURL={bailoutURL}
      duration={duration}
      locationId={locationId}
      patientId={patientId}
      patientKey={patientKey}
      providers={providers}
      reason={reason}
      returnURL={returnURL}
      brandColor={brandColor}
      accentColor={accentColor}
      shadowRoot={appRoot.shadowRoot}
    />,
    appRoot.shadowRoot
  )
}
