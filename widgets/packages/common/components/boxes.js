import styled from 'styled-components'
import { backgroundColor, margin } from '../utils/styles'

export const Box = styled.div`
  ${margin}

  align-items: var(--ai, center);
  display: flex;
  flex-direction: var(--fd, column);
  text-align: center;
  width: var(--width, 100%);
`

export const AccentBox = styled(Box)`
  ${backgroundColor}

  border-radius: 5px;
  padding: 1rem;
`

export const Fieldset = styled.fieldset`
  ${backgroundColor}

  border: none;
  border-radius: 5px;
  margin: 0 0 1rem;
  padding: 1rem;
`

export const Legend = styled.legend`
  float: left;
  font-size: 1.125rem;
  font-weight: 700;
  padding: 0;
  width: fit-content;
`

export const TzMessage = styled.p`
  font-size: 0.875rem;
  margin: 0.875rem 0;
  text-align: center;
`

export const IconBox = styled.div`
  height: 2.25rem;
  width: 2.25rem;
`
