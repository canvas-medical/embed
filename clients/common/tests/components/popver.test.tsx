import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { Popover } from '../../src'

describe('Popover', () => {
  it('renders', () => {
    expect(
      render(
        <Popover open titleId="id" shadowRoot="arbitrary">
          <div>I'm children</div>
        </Popover>
      )
    ).toMatchSnapshot()
  })
})
