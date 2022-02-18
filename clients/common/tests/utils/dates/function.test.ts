import { checkDateTimeMatch, isSameDay } from '../../../src'

describe('isSameDay', () => {
  it('returns true', () => {
    const a = new Date('2022-02-28T14:20:00.000Z')

    expect(isSameDay(a, a)).toBe(true)
  })

  it('returns false', () => {
    const a = new Date('2022-02-28T14:20:00.000Z')
    const b = new Date('2022-03-28T14:20:00.000Z')

    expect(isSameDay(a, b)).toBe(false)
  })
})

describe('checkDateTimeMatch', () => {
  it('returns true', () => {
    const a = '2022-02-28T14:20:00.000Z'

    expect(checkDateTimeMatch(a, a)).toBe(true)
  })

  it('returns false', () => {
    const a = '2022-02-28T14:20:00.000Z'
    const b = '2022-03-28T14:20:00.000Z'

    expect(checkDateTimeMatch(a, b)).toBe(false)
  })
})
