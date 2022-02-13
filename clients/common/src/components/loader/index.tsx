import { h } from 'preact'
import styled, { keyframes } from 'styled-components'
import { Backdrop } from '..'
import { GeneratedColorsType } from '../..'
import { Box } from '../boxes'

type SpinnerPropsType = {
  borderColor: string
  bodyColor: string
}

type LoaderPropsType = {
  colors: GeneratedColorsType
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div<SpinnerPropsType>`
  animation: ${rotate} 1.5s linear infinite;
  animation-play-state: inherit;
  border: solid 5px ${p => p.borderColor};
  border-bottom-color: ${p => p.bodyColor};
  border-radius: 50%;
  content: '';
  height: 48px;
  width: 48px;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform;
`

export const Loader = ({ colors }: LoaderPropsType) => (
  <Backdrop invisible>
    <Box mt={'240px'}>
      <Spinner borderColor={colors.background} bodyColor={colors.accent.main} />
    </Box>
  </Backdrop>
)
