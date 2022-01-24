import { h } from 'preact'
import { BigCalendar, Box, Span, styles } from '@canvas/common'

export const NoAppointments = () => {
  return (
    <Box style={{ '--mt': '68px' }}>
      <BigCalendar fill={styles.font.grey25} />
      <Span style={{ '--mt': '16px', '--color': styles.font.grey50 }}>
        No Appointments on Record
      </Span>
    </Box>
  )
}
