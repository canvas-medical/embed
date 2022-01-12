import { h } from 'preact'
import {
  Box,
  BigCalendar,
  H2,
  IconBox,
  Button,
  OutlineButton,
} from '@canvas/common'
import {
  PopoverIcon,
  PopoverMessages,
  PopoverMessage,
  PopoverButtons,
} from '@canvas/common/components/popover/styles'

export const ConfirmSection = ({
  provider,
  start,
  treatment,
  onCancel,
  setScreen,
}) => {
  return (
    <Box>
      <H2>Confirm Your Appointment</H2>

      <PopoverIcon>
        <IconBox>
          <BigCalendar />
        </IconBox>
      </PopoverIcon>

      <PopoverMessages>
        <PopoverMessage>
          <strong>{start}</strong>
        </PopoverMessage>
        <PopoverMessage>{`${treatment} with ${provider}`}</PopoverMessage>
      </PopoverMessages>

      <PopoverButtons>
        <Button onClick={setScreen}>Confirm</Button>
        <OutlineButton onClick={onCancel}>Cancel</OutlineButton>
      </PopoverButtons>
    </Box>
  )
}
