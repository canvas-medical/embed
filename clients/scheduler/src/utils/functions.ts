import { InitialPropsType, SchedulerPropsType } from '.'

// This is a bit gross, but we want to print out specific error messages if the
// embed is not configured.

export const hasAllValues = (values: InitialPropsType & SchedulerPropsType) => {
  const errorMessages = []

  if (!values.bailoutURL) {
    errorMessages.push('No Bailout URL supplied.')
  }

  return errorMessages
}
