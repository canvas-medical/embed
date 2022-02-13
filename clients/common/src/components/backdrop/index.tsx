import { h, ComponentChildren } from 'preact'
import styled from 'styled-components'
import FocusTrap from 'focus-trap-react'

type BackdropPropsType = {
  open: boolean
  children: ComponentChildren
  shadowRoot: any
  zIndex?: number
}

type BackdropContainerPropsType = {
  invisible?: boolean
  zIndex?: number
}

export const Backdrop = styled.div<BackdropContainerPropsType>`
  justify-content: center;
  background-color: ${p => (p.invisible ? null : 'hsla(0, 100%, 100%, 0.9)')};
  display: flex;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${p => p.zIndex || 1000};
`

export const FocusTrapBackdrop = ({
  open,
  children,
  shadowRoot,
  zIndex,
}: BackdropPropsType) => {
  if (open && shadowRoot) {
    return (
      <FocusTrap
        focusTrapOptions={{
          // shadowRoot is a valid option for this
          // @ts-ignore
          document: shadowRoot,
        }}
      >
        <Backdrop zIndex={zIndex}>{children}</Backdrop>
      </FocusTrap>
    )
  }

  return null
}
