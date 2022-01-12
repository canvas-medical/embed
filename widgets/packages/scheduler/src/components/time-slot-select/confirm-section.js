import {
  Box,
  BigCalendar,
  H2,
  H3,
  IconBox,
  LargerSpan,
  Button,
  OutlineButton,
} from '@canvas/common'
import { h } from 'preact'

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
      <Box mt="16px" mb="16px">
        <IconBox>
          <BigCalendar />
        </IconBox>
      </Box>
      <H3>{start}</H3>
      <LargerSpan>{`${treatment} with ${provider}`}</LargerSpan>
      <Box
        flexDirection="row"
        width="auto"
        ml="auto"
        mr="auto"
        mt="16px"
        mb="16px"
      >
        <Button ml="16px" mr="16px" onClick={setScreen}>
          Confirm
        </Button>
        <OutlineButton onClick={onCancel}>Cancel</OutlineButton>
      </Box>
    </Box>
  )
}
