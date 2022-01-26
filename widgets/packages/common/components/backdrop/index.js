import { h } from 'preact'
import FocusTrap from 'focus-trap-react'
import { BackdropContainer } from './styles'

export const Backdrop = ({ open, children, shadowRoot }) => {
  if (open) {
    return (
      <FocusTrap
        focusTrapOptions={{
          document: shadowRoot,
        }}
      >
        <BackdropContainer>{children}</BackdropContainer>
      </FocusTrap>
    )
  }

  return null
}
