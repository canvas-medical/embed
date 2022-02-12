import styled from 'styled-components'
import { BackgroundColorPropType } from '../../utils'

export const StyledHeader = styled.div<BackgroundColorPropType>`
  background-color: ${p => p.bc};

  display: flex;
  height: 3.75rem;
  justify-content: center;
  padding: 0 0.5rem;
`
export const ContainedHeader = styled.div`
  display: flex;
  min-width: 345px;
  max-width: 650px;
  width: 100%;
`

export const HeadingWrapper = styled.div`
  display: flex;
  height: 3.75rem;
  left: 0;
  position: relative;
  top: 0;
  width: 100%;
  z-index: 1;
`
