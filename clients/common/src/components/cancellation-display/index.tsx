import { h } from 'preact'
import { Box } from '../boxes'
import { H2 } from '../typograhpy'
import { colors } from '../../utils'
import { Button, ButtonGroup } from '../buttons'

type CancellationDisplayPropsType = {
  onCancel: Function
  onKeep: Function
}

export const CancellationDisplay = ({
  onCancel,
  onKeep,
}: CancellationDisplayPropsType) => {
  return (
    <Box>
      <H2>Cancel Your Appointment</H2>

      <ButtonGroup>
        <Button
          bc={colors.destructive.main}
          hc={colors.destructive.hover}
          fc={colors.destructive.font}
          data-analytics-id="cancellation-display-close"
          onClick={e => onCancel(e)}
        >
          Yes, cancel it
        </Button>
        <Button
          bc={colors.secondary.main}
          hc={colors.secondary.hover}
          fc={colors.secondary.font}
          data-analytics-id="cancellation-display-keep"
          onClick={e => onKeep(e)}
        >
          No, keep it
        </Button>
      </ButtonGroup>
    </Box>
  )
}
