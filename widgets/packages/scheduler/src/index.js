import { h, render } from 'preact'
import { cssStyles, generateColors, getAppointmentType } from '@canvas/common'
import { StyleSheetManager } from 'styled-components'
import { App } from './App'
import { ContextWrapper } from './hooks'

const StyledApp = ({
  api,
  appointmentTypeCode,
  bailoutURL,
  brandColor,
  accentColor,
  duration,
  locationId,
  patientId,
  patientKey,
  providers,
  reason,
  returnURL,
  rootId,
}) => {
  const shadowRoot = document.querySelector(`#${rootId}`).shadowRoot
  const colors = generateColors(brandColor, accentColor)
  const treatment = getAppointmentType(appointmentTypeCode).type

  console.log(colors)

  return (
    <StyleSheetManager target={document.querySelector(`#${rootId}`).shadowRoot}>
      <ContextWrapper
        values={{
          api,
          appointmentTypeCode,
          bailoutURL,
          colors,
          duration,
          locationId,
          patientId,
          patientKey,
          providers,
          reason,
          returnURL,
          shadowRoot,
          treatment,
        }}
      >
        <App />
      </ContextWrapper>
    </StyleSheetManager>
  )
}

export const init = ({
  appointmentTypeCode,
  api,
  bailoutURL,
  brandColor,
  accentColor,
  duration,
  locationId,
  patientId,
  patientKey,
  providers,
  reason,
  returnURL,
  rootId,
}) => {
  const appRoot = document.querySelector(`#${rootId}`)
  appRoot.attachShadow({
    mode: 'open',
  })

  const styleTag = document.createElement('style')
  styleTag.innerHTML = cssStyles
  appRoot.shadowRoot.appendChild(styleTag)

  render(
    <StyledApp
      api={api}
      appointmentTypeCode={appointmentTypeCode}
      bailoutURL={bailoutURL}
      brandColor={brandColor}
      accentColor={accentColor}
      duration={duration}
      locationId={locationId}
      patientId={patientId}
      patientKey={patientKey}
      providers={providers}
      reason={reason}
      returnURL={returnURL}
      rootId={rootId}
    />,
    appRoot.shadowRoot
  )
}
