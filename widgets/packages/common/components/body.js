import styled from 'styled-components'
import { styles } from '../utils/styles'

/*
 * Confines app contents to defined max and min widths.
 */

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  min-width: ${styles.minWidth};
  max-width: ${styles.maxWidth};
  padding: 0 16px;
  width: 100%;
`
