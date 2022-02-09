import { h } from 'preact'
import { Span } from '.'
import { Warning } from '../assets'
import { Box } from './boxes'

export const Error = ({ errorMessage }) => {
  return (
    <Box style={{ '--mt': '5rem' }}>
      <Warning />
      <Span
        style={{
          '--color': '#D02121',
          '--mt': '1rem',
          '--mw': '180px',
          '--fs': '0.875rem',
        }}
      >
        {errorMessage}
      </Span>
    </Box>
  )
}
