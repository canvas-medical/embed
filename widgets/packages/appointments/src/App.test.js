import { h } from 'preact'
import { App } from './App'
import { render } from '@testing-library/preact'

describe('App', () => {
  it('renders', () => {
    const { getByText } = render(<App />)
    expect(getByText('Appointments')).toBeTruthy()
  })
})
