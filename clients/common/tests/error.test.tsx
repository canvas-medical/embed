import '@testing-library/jest-dom'
import { h } from 'preact'
import { render } from '@testing-library/preact'
import { Error } from '../src'

test('Renders Error with one error message', () => {
  const error = 'This is a single error'

  const { queryByText } = render(<Error errorMessages={error} />)

  expect(queryByText(error)).toBeInTheDocument()
})

test('Renders Error with multiple error messages', () => {
  const error = [
    'This is the first error error',
    'This is the second error',
    'This is the third error',
  ]

  const { queryByText } = render(<Error errorMessages={error} />)

  error.forEach(message => expect(queryByText(message)).toBeInTheDocument())
})
