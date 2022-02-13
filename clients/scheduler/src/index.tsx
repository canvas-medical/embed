import { h, render } from 'preact'
import { StyleSheetManager } from 'styled-components'
import { css, Error, generateColors } from '@canvas/embed-common'
import { ContextWrapper } from './hooks'
import { App } from './App'
import {
  hasAllValues,
  InitializerPropsType,
  InitialPropsType,
  SchedulerPropsType,
} from './utils'

export const Scheduler = (props: InitialPropsType & SchedulerPropsType) => {
  const {
    api,
    bailoutURL,
    duration,
    locationId,
    patientId,
    patientKey,
    providers,
    brandColor,
    accentColor,
    shadowRoot,
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
            bailoutURL,
            duration,
            locationId,
            patientId,
            patientKey,
            providers,
            colors,
            shadowRoot,
            loading: false,
            timeSlot: null,
            setTimeSlot: () => {},
            fetchTimeSlots: () => {},
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
  bailoutURL,
  duration,
  locationId,
  patientId,
  patientKey,
  providers,
  rootId,
  brandColor,
  accentColor,
}: InitialPropsType & InitializerPropsType) => {
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
      bailoutURL={bailoutURL}
      duration={duration}
      locationId={locationId}
      patientId={patientId}
      patientKey={patientKey}
      providers={providers}
      brandColor={brandColor}
      accentColor={accentColor}
      shadowRoot={appRoot.shadowRoot}
    />,
    appRoot.shadowRoot
  )
}
