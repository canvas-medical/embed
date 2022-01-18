import styled from 'styled-components'
import { primaryBackgoundColor, styles } from '../../utils/styles'

/*
 * The "header" can extend past the max-width of the application
 * These two components handle extending the header the full with
 * of the application while still containing its contents to the
 * the application width
 */
export const StyledHeader = styled.div`
  ${primaryBackgoundColor}

  display: flex;
  height: 3.75rem;
  justify-content: center;
  padding: 0 0.5rem;
`
export const ContainedHeader = styled.div`
  display: flex;
  min-width: ${styles.minWidth};
  max-width: ${styles.maxWidth};
  width: 100%;
`

export const HeadingWrapper = styled.div`
  display: flex;
  height: 3.75rem;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`

export const Heading = styled.h1`
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  margin: auto;
  position: relative;
`
