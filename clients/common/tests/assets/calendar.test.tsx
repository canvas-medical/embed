import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { Calendar } from '../../src'

describe('Calendar', () => {
  it('renders without props', () => {
    expect(render(<Calendar />)).toMatchSnapshot()
  })

  it('renders with props', () => {
    expect(
      render(<Calendar height={48} width={48} fill="#FFF" />)
    ).toMatchSnapshot()
  })
})
