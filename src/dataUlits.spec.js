import { x, y, getFirstItem, addStatusOfDatum, getLastItem, dropNEnds, getFirstSeries, getFirstLastItem, parseDate, inRange, datumInRange } from './dataUtils'
import getNDataPoints from './mockData'
describe('load data', () => {
  it('it loads array of length N', () => {
    const n = 10
    const data = getNDataPoints(n)
    const series = data[0]
    expect(data.length).toBe(1)
    expect(series.length).toBe(n)
  })
})

describe('get first item of fist list in data shape', () => {
  it('it extracts first datum', () => {
    const data = [
      { temperature: 62.7, date: 20111001 },
      { temperature: 59.9, date: 20111002 },
      { temperature: 59.1, date: 20111003 },
      { temperature: 58.8, date: 20111004 },
      { temperature: 58.7, date: 20111005 }]
    const firstDatum = { temperature: 62.7, date: 20111001 }
    const extracted = getFirstItem(data)
    expect(extracted).toEqual(firstDatum)
  })
})

describe('get first item of fist list in data shape', () => {
  it('it extracts first datum', () => {
    const data = [[
      { temperature: 62.7, date: 20111001 },
      { temperature: 59.9, date: 20111002 }],
    [{ temperature: 59.1, date: 20111003 },
      { temperature: 58.8, date: 20111004 }],
    [{ temperature: 58.7, date: 20111005 },
      { temperature: 57, date: 20111006 }]]
    const firstSeries = [
      { temperature: 62.7, date: 20111001 },
      { temperature: 59.9, date: 20111002 }]
    const extracted = getFirstSeries(data)
    expect(extracted).toEqual(firstSeries)
  })
})

describe('get last item of fist list in data shape', () => {
  it('it extracts first datum', () => {
    const data = [
      { temperature: 62.7, date: 20111001 },
      { temperature: 59.9, date: 20111002 },
      { temperature: 59.1, date: 20111003 },
      { temperature: 58.8, date: 20111004 },
      { temperature: 58.7, date: 20111005 }]
    const firstDatum = { temperature: 58.7, date: 20111005 }
    const extracted = getLastItem(data)
    expect(extracted).toEqual(firstDatum)
  })
})

describe('getlast item of fist list in data shape', () => {
  it('it extracts first datum', () => {
    const data = [
      { temperature: 62.7, date: 20111001 },
      { temperature: 59.9, date: 20111002 },
      { temperature: 59.1, date: 20111003 },
      { temperature: 58.8, date: 20111004 },
      { temperature: 58.7, date: 20111005 },
      { temperature: 57, date: 20111006 },
      { temperature: 56.7, date: 20111007 },
      { temperature: 56.8, date: 20111008 },
      { temperature: 56.7, date: 20111009 },
      { temperature: 60.1, date: 20111010 }]
    const remainingItems = [{ temperature: 59.1, date: 20111003 },
      { temperature: 58.8, date: 20111004 },
      { temperature: 58.7, date: 20111005 },
      { temperature: 57, date: 20111006 },
      { temperature: 56.7, date: 20111007 },
      { temperature: 56.8, date: 20111008 }]
    const extracted = dropNEnds(2)(data)
    expect(extracted).toEqual(remainingItems)
  })
})

describe('get array of first and last item of series', () => {
  it('it gets an array of the first and last item from the beginning', () => {
    const data = [
      { temperature: 62.7, date: 20111001 },
      { temperature: 59.9, date: 20111002 },
      { temperature: 59.1, date: 20111003 },
      { temperature: 58.8, date: 20111004 },
      { temperature: 58.7, date: 20111005 },
      { temperature: 57, date: 20111006 },
      { temperature: 56.7, date: 20111007 },
      { temperature: 56.8, date: 20111008 },
      { temperature: 56.7, date: 20111009 },
      { temperature: 60.1, date: 20111010 }]
    const firstLastArray = [{ temperature: 62.7, date: 20111001 },
      { temperature: 60.1, date: 20111010 }]
    const extracted = getFirstLastItem(data)
    expect(extracted).toEqual(firstLastArray)
  })
})

describe('checks if date is within certain range, compact interval', () => {
  let isInCertainRange
  const rangeStart = parseDate(20111004)
  const rangeEnd = parseDate(20111010)
  const range = [rangeStart, rangeEnd]
  beforeEach(() => {
    isInCertainRange = inRange(range)
  })
  it('it returns true if date is ealier', () => {
    const earlierDate = parseDate(20111001)
    const isInside = isInCertainRange(earlierDate)
    expect(isInside).toBe(false)
  })
  it('it returns false if date is later', () => {
    const laterDate = parseDate(20111011)
    const isInside = isInCertainRange(laterDate)
    expect(isInside).toBe(false)
  })
  it('it returns true if date is equal lower bound', () => {
    const isInside = isInCertainRange(rangeStart)
    console.log(isInside)
    expect(isInside).toBe(true)
  })
  it('it returns true if date is equal upper bound', () => {
    const isInside = isInCertainRange(rangeEnd)
    expect(isInside).toBe(true)
  })
})

describe('checks if datum is in range', () => {
  const range = [parseDate(20111004), parseDate(20111006)]
  const datumInCertainRange = datumInRange(range)
  const insideDatum = { temperature: 58.7, date: parseDate(20111005) }
  const outsideDatum = { temperature: 56.7, date: parseDate(20111007) }
  it('it returns true if datum is inside', () => {
    const isInside = datumInCertainRange(insideDatum)
    expect(isInside).toBe(true)
  })
  it('it returns false if datum is outside', () => {
    const isInside = datumInCertainRange(outsideDatum)
    expect(isInside).toBe(false)
  })
})

describe('changes state to selected it predicate is true', () => {
  const datum = { temperature: 58.7, date: parseDate(20111005) }
  const truePredicate = jest.fn().mockReturnValue(true)
  const falsePredicate = jest.fn().mockReturnValue(false)

  it('it adds selected state if true', () => {
    const newDatum = addStatusOfDatum(truePredicate, datum)
    expect(truePredicate).toBeCalledWith(datum)
    expect(newDatum).toMatchObject({ temperature: 58.7, date: parseDate(20111005), state: 'selected' })
  })
  it('it adds default state if predicate returns false', () => {
    const newDatum = addStatusOfDatum(falsePredicate, datum)
    expect(falsePredicate).toBeCalledWith(datum)
    expect(newDatum).toMatchObject({ temperature: 58.7, date: parseDate(20111005), state: 'default' })
  })
})
