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
  getAppointmentType,
} from '@canvas-medical/embed-common'
import { useAppContext } from '../../hooks'

export const Confirmation = () => {
  const {
    colors,
    loading,
    timeSlot,
    appointmentCoding,
    returnURL,
    cancelAppointment,
    fetchScheduledAppointment,
    resetTimeSlot,
    shadowRoot,
    setScreen,
    setInitialized,
    initialized,
    callbacks: { onClick, onCancel, onLoad },
  } = useAppContext()
  const [appointmentId, setAppointmentId] = useState(null)
  const [popoverOpen, setPopoverOpen] = useState(false)

  useEffect(() => {
    fetchScheduledAppointment(setAppointmentId)
  }, [fetchScheduledAppointment])

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)
    }
  }, [initialized])

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (appointmentId) {
      cancelAppointment(appointmentId, () => {
        resetTimeSlot()
        setScreen('SELECT')
        onCancel(e)
      })
    }
    onClick(e)
  }

  const handleKeep = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverOpen(false)
    onClick(e)
  }

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverOpen(true)
    onClick(e)
  }

  const handleFinishClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e)
    window.location.href = returnURL
  }

  const appointmentDate = new Date(timeSlot.start)
  const dateString = `${formatDate(appointmentDate)} at ${formatTime(
    appointmentDate
  )}`
  const display =
    appointmentCoding.display || getAppointmentType(appointmentCoding.code)

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
            <Span>{`${display} with ${timeSlot.provider.name}`}</Span>
          </Box>
          <Box my="8px">
            <Button
              bc={colors.accent.main}
              hc={colors.accent.hover}
              fc={colors.accent.font}
              data-analytics-id="appointment-confirmation-cancel"
              onClick={e => handleCancelClick(e)}
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
            data-analytics-id="appointment-confirmation-finish"
            onClick={e => handleFinishClick(e)}
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
        <CancellationDisplay onCancel={handleCancel} onKeep={handleKeep} />
      </Popover>
    </Fragment>
  )
}
