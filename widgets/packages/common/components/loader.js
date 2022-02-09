import { h } from 'preact'
import styled, { keyframes } from 'styled-components'
import { Box } from '.'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  animation: ${rotate} 1.5s linear infinite;
  animation-play-state: inherit;
  border: solid 5px #e9f3fa;
  border-bottom-color: #2185d0;
  border-radius: 50%;
  content: '';
  height: 48px;
  width: 48px;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform;
`

export const Loader = () => (
  <Box style={{ '--mt': '40%' }}>
    <Spinner />
  </Box>
)
