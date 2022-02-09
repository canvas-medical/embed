import { backgroundColor, styles } from '@canvas/common'
import styled from 'styled-components'

export const DateViewContainer = styled.div`
  ${backgroundColor}
  border-radius: 1.25rem;
  display: flex;
  height: 2.5rem;
  margin: 0 auto;
  max-width: ${styles.minWidth};
  width: 100%;
`

export const DateSelectButton = styled.button`
  align-items: center;
  background-color: unset;
  border: unset;
  display: flex;
  flex-grow: 1;
  justify-content: center;

  &:hover {
    h2 {
      color: var(--hc);
    }

    path {
      fill: var(--hc);
    }
  }
`

export const DateScrollButton = styled.button`
  align-items: center;
  background-color: unset;
  border: unset;
  display: flex;
  justify-content: center;
  padding: 0;
  width: 2.5rem;

  path {
    stroke: var(--mc);
  }

  &:first-child {
    border-radius: 100% 0 0 100%;
  }

  &:last-child {
    border-radius: 0 100% 100% 0;
  }

  &:hover {
    path {
      stroke: var(--hc);
    }
  }

  &:disabled {
    background-color: unset;
    path {
      stroke: ${styles.font.grey25};
    }
  }
`

export const IconContainer = styled.div``

export const DateHeading = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  margin-left: 10px;
  color: #000;
`
