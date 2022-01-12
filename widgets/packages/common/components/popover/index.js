import { h } from 'preact'
import FocusTrap from 'focus-trap-react'
import { PopoverBackdrop, PopoverContainer } from './styles'

export const Popover = ({ open, children, titleId }) => {
  if (open) {
    return (
      <FocusTrap>
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
