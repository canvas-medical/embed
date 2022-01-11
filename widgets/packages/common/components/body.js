import styled from 'styled-components'
import { styles } from '../utils/styles'

/*
 * Confines app contents to defined max and min widths.
 */

export const Body = styled.div`
  min-width: ${styles.minWidth};
  max-width: ${styles.maxWidth};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding: 0 16px;
`
