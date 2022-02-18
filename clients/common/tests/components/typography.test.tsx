import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { H1, H2, H3, Legend, ScreenReaderText, Span } from '../../src'

describe('H1', () => {
  it('renders without props', () => {
    expect(render(<H1>I'm text</H1>)).toMatchSnapshot()
  })

  it('renders with props', () => {
    expect(render(<H1 fc="#121212">I'm text</H1>)).toMatchSnapshot()
  })
})

describe('H2', () => {
  it('renders without props', () => {
    expect(render(<H2>I'm text</H2>)).toMatchSnapshot()
  })

  it('renders with props', () => {
    expect(render(<H2 fc="#121212">I'm text</H2>)).toMatchSnapshot()
  })
})

describe('H3', () => {
  it('renders', () => {
    expect(render(<H3>I'm text</H3>)).toMatchSnapshot()
  })
})

describe('Legend', () => {
  it('renders', () => {
    expect(render(<Legend>I'm text</Legend>)).toMatchSnapshot()
  })
})

describe('Span', () => {
  it('renders without props', () => {
    expect(render(<Span>I'm text</Span>)).toMatchSnapshot()
  })

  it('renders with props', () => {
    expect(
      render(
        <Span fc="#121212" fontSize="2rem">
          I'm text
        </Span>
      )
    ).toMatchSnapshot()
  })
})

describe('ScreenReaderText', () => {
  it('renders', () => {
    expect(
      render(<ScreenReaderText>I'm text</ScreenReaderText>)
    ).toMatchSnapshot()
  })
})
