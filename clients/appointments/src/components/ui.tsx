import { h } from 'preact'
import {
  Body,
  AccentBox,
  Box,
  Calendar,
  H3,
  Span,
  Popover,
  getAppointmentType,
  formatDate,
  formatTime,
  Button,
  CancellationDisplay,
  AppointmentType,
  GeneratedColorsType,
} from '@canvas/embed-common'
import { NoAppointments } from './no-appointments'

type UiPropsType = {
  appointments: AppointmentType[]
  colors: GeneratedColorsType
  onCancel: Function
  onKeep: Function
  handleCancel: Function
  shadowRoot: any
  appointmentCancellation: {
    popoverOpen: boolean
    appointment: AppointmentType
  }
}

export const Ui = ({
  appointments,
  colors,
  onCancel,
  onKeep,
  handleCancel,
  shadowRoot,
  appointmentCancellation,
}: UiPropsType) => (
  <Body>
    {appointments.length ? (
      appointments.map(appointment => {
        const appointmentDate = new Date(appointment.start)
        const dateString = `${formatDate(appointmentDate)} at ${formatTime(
          appointmentDate
        )}`

        return (
          <AccentBox key={appointment.id} bc={colors.background} my="16px">
            <Box mb="8px">
              <Calendar height={36} width={34} />
            </Box>
            <Box mb="8px">
              <H3>{dateString}</H3>
            </Box>
            <Box my="8px">
              <Span>
                {`${getAppointmentType(appointment.type).type} with ${
                  appointment.provider.name
                }`}
              </Span>
            </Box>
            <Box>
              <Button
                bc={colors.accent.main}
                hc={colors.accent.hover}
                fc={colors.accent.font}
                onClick={() => handleCancel(appointment)}
              >
                Cancel
              </Button>
            </Box>
          </AccentBox>
        )
      })
    ) : (
      <NoAppointments />
    )}
    <Popover
      shadowRoot={shadowRoot}
      open={appointmentCancellation.popoverOpen}
      titleId={'confirm-cancellation'}
    >
      <CancellationDisplay
        onCancel={() => onCancel()}
        onKeep={() => onKeep()}
      />
    </Popover>
  </Body>
)
