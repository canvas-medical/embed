import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import {
  Loader,
  TimeSlotsType,
  Popover,
  ProvidersType,
  ParsedSlotsType,
} from '@canvas-medical/embed-common'
import { useAppContext } from '../../hooks'
import { TimeSlots } from './time-slots'
import { ConfirmAppointment } from './confirm-appointment'

type UiPropsType = {
  timeSlots: ParsedSlotsType[]
}

type SelectTimeSlotType = {
  start: string
  end: string
  provider: ProvidersType
}

export const Ui = ({ timeSlots }: UiPropsType) => {
  const {
    error,
    colors,
    setTimeSlot,
    loading,
    shadowRoot,
    resetTimeSlot,
    providers,
  } = useAppContext()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const selectTimeSlot = ({ start, end, provider }: SelectTimeSlotType) => {
    setTimeSlot({
      start,
      end,
      provider,
    })
    setPopoverOpen(true)
  }

  const cancelConfirmation = () => {
    setPopoverOpen(false)
    resetTimeSlot()
  }

  const findProvider = (providerId: string) => {
    return (
      providers.find(({ id }) => id === providerId) || {
        id: providerId,
        name: '',
      }
    )
  }

  if (loading) {
    return <Loader colors={colors} />
  }

  return (
    <Fragment>
      {timeSlots.map(({ providerId, providerSlots }) => {
        return (
          <TimeSlots
            key={providerId}
            provider={findProvider(providerId)}
            slots={providerSlots}
            selectTimeSlot={selectTimeSlot}
          />
        )
      })}
      <Popover
        shadowRoot={shadowRoot}
        open={popoverOpen}
        titleId={'confirm-slot'}
      >
        <ConfirmAppointment onCancel={() => cancelConfirmation()} />
      </Popover>
    </Fragment>
  )
}
