import { h } from 'preact'
import { PopoverBackdrop, PopoverContainer } from './styles'

export const Popover = ({ open, children }) => {
  if (open) {
    return (
      <PopoverBackdrop>
        <PopoverContainer>{children}</PopoverContainer>
      </PopoverBackdrop>
    )
  }

  return null
}
