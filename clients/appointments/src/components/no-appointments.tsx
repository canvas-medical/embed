import { h } from 'preact'
import { Calendar, colors, Box, Span } from '@canvas-medical/embed-common'

export const NoAppointments = () => {
  return (
    <Box mt="68px">
      <Calendar height={36} width={34} fill={colors.font.grey25} />
      <Box mt="16px">
        <Span fc={colors.font.grey50}>No Appointments on Record</Span>
      </Box>
    </Box>
  )
}
