import styled from 'styled-components'
import { backgroundColor, hoverColor, margin } from '../utils'

export const Button = styled.button`
  ${backgroundColor}
  ${hoverColor}
  ${margin}

  border: none;
  border-radius: 5px;
  color: var(--c, #fff);
  font-size: 1.125rem;
  font-weight: var(--fw);
  height: 50px;
  width: 200px;

  @media (max-width: 475px) {
    width: 138px;
  }
`

export const OutlineButton = styled(Button)`
  background-color: #fff;
  border: 1px solid #595959;
  color: #595959;

  &:hover {
    background-color: #a8a8a8;
  }
`
