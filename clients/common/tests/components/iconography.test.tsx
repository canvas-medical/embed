import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { IconButtonLink, IconButton, ArrowBack } from '../../src'

describe('IconButtonLink', () => {
  it('renders with minimal props', () => {
    expect(
      render(
        <IconButtonLink fc="#232323" hc="#303030">
          <ArrowBack />
        </IconButtonLink>
      )
    ).toMatchSnapshot()
  })

  it('renders with props', () => {
    expect(
      render(
        <IconButtonLink hc="#303030" fc="#000" m="16px">
          <ArrowBack />
        </IconButtonLink>
      )
    ).toMatchSnapshot()
  })
})

describe('IconButton', () => {
  it('renders with minimal props', () => {
    expect(
      render(
        <IconButton fc="#232323" hc="#303030">
          <ArrowBack />
        </IconButton>
      )
    ).toMatchSnapshot()
  })

  it('renders with props', () => {
    expect(
      render(
        <IconButton hc="#303030" fc="#000" m="16px">
          <ArrowBack />
        </IconButton>
      )
    ).toMatchSnapshot()
  })

  it('is disabled', () => {
    expect(
      render(
        <IconButton disabled hc="#303030" fc="#000" m="16px">
          <ArrowBack />
        </IconButton>
      )
    ).toMatchSnapshot()
  })
})
