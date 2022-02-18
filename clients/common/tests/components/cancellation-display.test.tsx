import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { render as testingRender, fireEvent } from '@testing-library/preact'
import { CancellationDisplay } from '../../src'

describe('CancellationDisplay', () => {
  it('renders ', () => {
    expect(
      render(<CancellationDisplay onCancel={() => {}} onKeep={() => {}} />)
    ).toMatchSnapshot()
  })

  it('clicks "Yes, cancel it"', async () => {
    const mockCallBack = jest.fn()

    const { getByText } = testingRender(
      <CancellationDisplay onCancel={mockCallBack} onKeep={() => {}} />
    )

    fireEvent.click(getByText('Yes, cancel it'))

    expect(mockCallBack).toBeCalled()
  })

  it('clicks "No, keep it"', async () => {
    const mockCallBack = jest.fn()

    const { getByText } = testingRender(
      <CancellationDisplay onCancel={() => {}} onKeep={mockCallBack} />
    )

    fireEvent.click(getByText('No, keep it'))

    expect(mockCallBack).toBeCalled()
  })
})
