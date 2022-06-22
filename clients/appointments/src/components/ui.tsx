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
  ProvidersType,
} from '@canvas-medical/embed-common'
import { NoAppointments } from './no-appointments'

type UiPropsType = {
  appointments: AppointmentType[]
  providers: ProvidersType[]
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
  providers,
  colors,
  onCancel,
  onKeep,
  handleCancel,
  shadowRoot,
  appointmentCancellation,
}: UiPropsType) => {
  return (
    <Body>
      {appointments.length ? (
        appointments.map(appointment => {
          const validDescription =
            appointment.description &&
            appointment.description.length > 0 &&
            appointment.description !== 'No description given'
          const appointmentDate = new Date(appointment.start)
          const dateString = `${formatDate(appointmentDate)} at ${formatTime(
            appointmentDate
          )}`
          const provider = providers.find(
            ({ id }) => id === appointment.providerId
          )?.name

          return (
            <AccentBox key={appointment.id} bc={colors.background} my="16px">
              <Box mb="8px">
                <Calendar height={36} width={34} />
              </Box>
              <Box mb="8px">
                <H3>{dateString}</H3>
              </Box>
              <Box my="8px">
                <Span>{`${
                  validDescription
                    ? appointment.description
                    : appointment.display
                } with ${provider}`}</Span>
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
}
