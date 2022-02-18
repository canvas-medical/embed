import {
  checkDateTimeMatch,
  formatDate,
  formatDateForAPI,
  formatTime,
  toISOString,
} from '../../../src'

test('formatTime', () => {
  const date = '2022-02-28T14:20:00.000Z'

  expect(formatTime(date)).toBe('2:20 PM')
})

test('formatDate', () => {
  const date = new Date('2022-02-28T14:20:00.000Z')

  expect(formatDate(date)).toBe('Feb 28, 2022')
})

test('formatDateForAPI', () => {
  const date = new Date('2022-02-28T14:20:00.000Z')

  expect(formatDateForAPI(date)).toBe('2022-02-28')
})

test('toISOString', () => {
  const date = '2022-02-28T14:20:00.000Z'

  expect(toISOString(date)).toBe(date)
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
