import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import {
  AccentBox,
  Box,
  Button,
  formatDate,
  H2,
  H3,
  Span,
  formatTime,
  Calendar,
  Loader,
  CancellationDisplay,
  Popover,
} from '@canvas/embed-common'
import { useAppContext } from '../../hooks'

export const Confirmation = () => {
  const {
    colors,
    loading,
    timeSlot,
    treatment,
    returnURL,
    cancelAppointment,
    fetchScheduledAppointment,
    shadowRoot,
  } = useAppContext()
  const [appointmentId, setAppointmentId] = useState(null)
  const [popoverOpen, setPopoverOpen] = useState(false)

  useEffect(() => {
    fetchScheduledAppointment(setAppointmentId)
  }, [fetchScheduledAppointment])

  const afterCancel = () => {
    window.location.href = returnURL
  }

  const handleCancel = () => {
    if (appointmentId) {
      cancelAppointment(appointmentId, afterCancel)
    }
  }

  const appointmentDate = new Date(timeSlot.start)
  const dateString = `${formatDate(appointmentDate)} at ${formatTime(
    appointmentDate
  )}`

  return (
    <Fragment>
      <Box>
        <Box my="16px">
          <H2>Your appointment has been scheduled</H2>
        </Box>

        <AccentBox bc={colors.background}>
          <Box mb="16px">
            <Calendar height={36} width={34} />
          </Box>
          <Box mb="8px">
            <H3>{dateString}</H3>
          </Box>
          <Box my="8px">
            <Span>{`${treatment.type} with ${timeSlot.provider.name}`}</Span>
          </Box>
          <Box my="8px">
            <Button
              bc={colors.accent.main}
              hc={colors.accent.hover}
              fc={colors.accent.font}
              onClick={() => setPopoverOpen(true)}
            >
              Cancel
            </Button>
          </Box>
        </AccentBox>

        <Box mt="32px">
          <Button
            bc={colors.accent.main}
            hc={colors.accent.hover}
            fc={colors.accent.font}
            onClick={() => (window.location.href = returnURL)}
          >
            Finish
          </Button>
        </Box>
      </Box>
      {loading && <Loader colors={colors} />}
      <Popover
        shadowRoot={shadowRoot}
        open={popoverOpen}
        titleId={'cancel-appointment'}
      >
        <CancellationDisplay
          onCancel={handleCancel}
          onKeep={() => setPopoverOpen(false)}
        />
      </Popover>
    </Fragment>
  )
}
