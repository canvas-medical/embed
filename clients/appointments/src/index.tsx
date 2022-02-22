import { h, render } from 'preact'
import { StyleSheetManager } from 'styled-components'
import { css, Error, generateColors } from '@canvas-medical/embed-common'
import { App } from './App'
import { IInitializerProps, IAppointmentProps, hasAllValues } from './utils'

export const Appointments = (props: IAppointmentProps) => {
  const {
    api,
    bailoutURL,
    locationId,
    patientId,
    patientKey,
    providerIds,
    brandColor,
    accentColor,
    shadowRoot,
    customFont,
  } = props
  const colors = generateColors(brandColor, accentColor)
  const allValuesProvided = hasAllValues(props)

  return (
    // Ignoring type mismatch error on target - ShadowRoot is an acceptable type
    // @ts-ignore
    <StyleSheetManager target={shadowRoot}>
      {!allValuesProvided.length ? (
        <App
          api={api}
          bailoutURL={bailoutURL}
          colors={colors}
          locationId={locationId}
          patientId={patientId}
          patientKey={patientKey}
          providerIds={providerIds}
          shadowRoot={shadowRoot}
          customFont={customFont}
        />
      ) : (
        <Error errorMessages={allValuesProvided} />
      )}
    </StyleSheetManager>
  )
}

export const init = ({
  api,
  bailoutURL,
  locationId,
  patientId,
  patientKey,
  providerIds,
  brandColor,
  accentColor,
  rootId,
  customFont,
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
    <Appointments
      api={api}
      bailoutURL={bailoutURL}
      locationId={locationId}
      patientId={patientId}
      patientKey={patientKey}
      providerIds={providerIds}
      brandColor={brandColor}
      accentColor={accentColor}
      shadowRoot={appRoot.shadowRoot}
      customFont={customFont}
    />,
    appRoot.shadowRoot
  )
}
