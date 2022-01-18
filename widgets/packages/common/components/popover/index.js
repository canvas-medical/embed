import { h } from 'preact'
import FocusTrap from 'focus-trap-react'
import { PopoverBackdrop, PopoverContainer } from './styles'

export const Popover = ({ open, children, titleId, shadowRoot }) => {
  if (open) {
    return (
      <FocusTrap
        focusTrapOptions={{
          document: shadowRoot,
        }}
      >
        <PopoverBackdrop>
          <PopoverContainer aria-labelledby={titleId}>
            {children}
          </PopoverContainer>
        </PopoverBackdrop>
      </FocusTrap>
    )
  }

  return null
}

export * from './styles'
