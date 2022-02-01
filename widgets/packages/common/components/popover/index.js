import { h } from 'preact'
import { Backdrop } from '../backdrop'
import { PopoverContainer } from './styles'

export const Popover = ({ open, children, titleId, shadowRoot }) => {
  if (open) {
    return (
      <Backdrop open={open} shadowRoot={shadowRoot}>
        <PopoverContainer aria-labelledby={titleId}>
          {children}
        </PopoverContainer>
      </Backdrop>
    )
  }

  return null
}

export * from './styles'
