import styled from 'styled-components'
import {
  primaryBackgoundColor,
  margin,
  hoverAndFocusBackgroundColor,
} from '../utils'

export const Button = styled.button`
  ${primaryBackgoundColor}
  ${margin}
  ${hoverAndFocusBackgroundColor}

  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  height: 50px;
  width: 200px;
`

export const OutlineButton = styled(Button)`
  background-color: #fff;
  border: 1px solid #595959;
  color: #595959;

  &:focus,
  &:hover {
    background-color: #a8a8a8;
  }
`
