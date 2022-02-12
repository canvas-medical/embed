import { h, render } from 'preact'
import { StyleSheetManager } from 'styled-components'
import { css, generateColors, Header } from '@canvas/embed-common'

type InitialPropsType = {
  bailoutURL: string
  brandColor: string
  accentColor: string
}

type InitializerPropsType = {
  rootId: string
}

type AppointmentPropsType = {
  shadowRoot: ShadowRoot
}

export const Appointments = ({
  bailoutURL,
  brandColor,
  accentColor,
  shadowRoot,
}: InitialPropsType & AppointmentPropsType) => {
  const colors = generateColors(brandColor, accentColor)

  return (
    // Ignoring type mismatch error on target - ShadowRoot is an acceptable type
    // @ts-ignore
    <StyleSheetManager target={shadowRoot}>
      <Header
        bailoutURL={bailoutURL}
        colors={colors}
        title="Your Appointments"
      />
    </StyleSheetManager>
  )
}

export const init = ({
  bailoutURL,
  brandColor,
  accentColor,
  rootId,
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
    <Appointments
      bailoutURL={bailoutURL}
      brandColor={brandColor}
      accentColor={accentColor}
      shadowRoot={appRoot.shadowRoot}
    />,
    appRoot.shadowRoot
  )
}
