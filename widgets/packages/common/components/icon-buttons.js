import styled from 'styled-components'
import { margin, styles } from '../utils/styles'

export const IconButtonLink = styled.a`
  align-items: center;
  display: flex;
  padding: 0.5rem;
  position: relative;
  z-index: 2;
`

export const IconButton = styled.button`
  ${margin}

  align-items: center;
  background-color: unset;
  border: unset;
  display: flex;
  padding: 0.5rem;
  position: relative;
  z-index: 2;

  path {
    stroke: var(--mc);
  }

  &:hover {
    path {
      stroke: var(--hc);
    }
  }

  &:disabled {
    path {
      stroke: ${styles.font.grey25};
    }
  }
`
