import styled from 'styled-components'
import { styles } from '../../utils/styles'

/*
 * The "header" can extend past the max-width of the application
 * These two components handle extending the header the full with
 * of the application while still containing its contents to the
 * the application width
 */
export const StyledHeader = styled.div`
  background-color: ${p => p.backgroundColor || styles.default.primary};
  height: 60px;
  display: flex;
  justify-content: center;
`
export const ContainedHeader = styled.div`
  min-width: ${styles.minWidth};
  max-width: ${styles.maxWidth};
  width: 100%;
  display: flex;
`

export const HeadingWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
`

export const Heading = styled.h1`
  position: relative;
  margin: auto;
`
