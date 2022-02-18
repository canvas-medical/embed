import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { Error } from '../../src'

describe('Error', () => {
  it('renders with a single error message', () => {
    const error = 'This is a single error'

    expect(render(<Error errorMessages={error} />)).toMatchSnapshot()
  })

  it('renders with multiple error messages', () => {
    const error = [
      'This is the first error error',
      'This is the second error',
      'This is the third error',
    ]

    expect(render(<Error errorMessages={error} />)).toMatchSnapshot()
  })
})
