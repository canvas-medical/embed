import { h, render } from 'preact'
import { StyleSheetManager } from 'styled-components'
import { css, Error, generateColors } from '@canvas-medical/embed-common'
import { ContextWrapper } from './hooks'
import { App } from './App'
import { hasAllValues, IInitializerProps, ISchedulerProps } from './utils'

export const Scheduler = (props: ISchedulerProps) => {
  const {
    api,
    appointmentBufferInMintues,
    appointmentCoding,
    bailoutURL,
    daysToFetch,
    duration,
    locationId,
    patientId,
    patientKey,
    providerIds,
    description,
    returnURL,
    brandColor,
    accentColor,
    shadowRoot,
    fontFamily,
  } = props
  const colors = generateColors(brandColor, accentColor)
  const allValuesProvided = hasAllValues(props)

  return (
    // Ignoring type mismatch error on target - ShadowRoot is an acceptable type
    // @ts-ignore
    <StyleSheetManager target={shadowRoot}>
      {!allValuesProvided.length ? (
        <ContextWrapper
          values={{
            api,
            appointmentBufferInMintues,
            appointmentCoding,
            bailoutURL,
            duration,
            locationId,
            patientId,
            patientKey,
            providerIds,
            colors,
            daysToFetch,
            description,
            returnURL,
            shadowRoot,
            fontFamily,
            loading: false,
            providers: [],
            setProviders: () => {},
            screen: 'SELECT',
            setScreen: () => {},
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
            error: '',
            fetchTimeSlots: () => {},
            fetchScheduledAppointment: () => {},
            createAppointment: () => {},
            cancelAppointment: () => {},
          }}
        >
          <App />
        </ContextWrapper>
      ) : (
        <Error errorMessages={allValuesProvided} />
      )}
    </StyleSheetManager>
  )
}

export const init = ({
  api,
  appointmentBufferInMintues = 60,
  appointmentCoding,
  bailoutURL,
  duration,
  locationId,
  patientId,
  patientKey,
  providerIds,
  daysToFetch = 7,
  description,
  returnURL,
  rootId,
  brandColor,
  accentColor,
  fontFamily,
}: IInitializerProps) => {
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
      appointmentBufferInMintues={appointmentBufferInMintues}
      appointmentCoding={appointmentCoding}
      bailoutURL={bailoutURL}
      daysToFetch={daysToFetch}
      duration={duration}
      locationId={locationId}
      patientId={patientId}
      patientKey={patientKey}
      providerIds={providerIds}
      description={description}
      returnURL={returnURL}
      brandColor={brandColor}
      accentColor={accentColor}
      shadowRoot={appRoot.shadowRoot}
      fontFamily={fontFamily}
    />,
    appRoot.shadowRoot
  )
}
