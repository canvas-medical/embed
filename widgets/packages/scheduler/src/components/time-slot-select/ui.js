import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { Popover, Loader } from '@canvas/common'
import { ConfirmSection } from './confirm-section'
import { useAppContext } from '../../hooks'
import { TimeSlots } from './time-slots'

export const Ui = ({ loading, timeSlots }) => {
  const { shadowRoot, setTimeSlot } = useAppContext()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const cancelConfirmation = () => {
    setPopoverOpen(false)
    setTimeSlot(null)
  }

  const selectTimeSlot = ({ start, end, provider }) => {
    setTimeSlot({
      start,
      end,
      provider,
    })
    setPopoverOpen(true)
  }

  console.log(timeSlots)

  if (loading) {
    return <Loader />
  }

  return (
    <Fragment>
      {timeSlots.map(({ provider, providerSlots }) => {
        return (
          <TimeSlots
            key={provider.id}
            provider={provider}
            slots={providerSlots}
            selectTimeSlot={selectTimeSlot}
          />
        )
      })}
      <Popover
        shadowRoot={shadowRoot}
        open={popoverOpen}
        onClose={() => cancelConfirmation()}
        titleId={'confirm-slot'}
      >
        <ConfirmSection onCancel={() => cancelConfirmation()} />
      </Popover>
    </Fragment>
  )
}
