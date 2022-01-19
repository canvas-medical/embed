import { h } from 'preact'
import {
  AccentBox,
  BigCalendar,
  Box,
  Button,
  formatDate,
  H2,
  H3,
  LargerSpan,
  OutlineButton,
} from '@canvas/common'
import { useAppContext } from '../../hooks'

export const Confirmation = () => {
  const { colors, setScreen, timeSlot, treatment, date } = useAppContext()

  return (
    <Box>
      <H2 style={{ '--my': '16px' }}>Your appointment has been scheduled</H2>

      <AccentBox style={{ '--bg': colors.accent }}>
        <Box style={{ '--mb': '16px' }}>
          <BigCalendar />
        </Box>
        <H3 style={{ '--mb': '8px' }}>
          {`${formatDate(date)} at ${timeSlot.start}`}
        </H3>
        <LargerSpan style={{ '--my': '8px' }}>
          {`${treatment} with ${timeSlot.provider}`}
        </LargerSpan>
        <OutlineButton
          style={{ '--my': '8px' }}
          onClick={() => setScreen('SELECT')}
        >
          Cancel
        </OutlineButton>
      </AccentBox>

      {/* This will eventually be some callback function or redirect */}
      <Button
        style={{ '--bg': colors.primary, '--mt': '32px' }}
        onClick={() => setScreen('SELECT')}
      >
        Finish
      </Button>
    </Box>
  )
}
