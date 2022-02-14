import { ComponentChildren, h } from 'preact'
import styled from 'styled-components'
import { FocusTrapBackdrop } from '../backdrop'

const PopoverContainer = styled.div`
  background-color: #fff;
  bottom: 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.21);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  position: absolute;
  width: 100%;
`

type PopoverPropsType = {
  open: boolean
  children: ComponentChildren
  titleId: string
  shadowRoot: any
}

export const Popover = ({
  open,
  children,
  titleId,
  shadowRoot,
}: PopoverPropsType) => {
  return (
    <FocusTrapBackdrop open={open} shadowRoot={shadowRoot}>
      <PopoverContainer aria-labelledby={titleId}>{children}</PopoverContainer>
    </FocusTrapBackdrop>
  )
}
