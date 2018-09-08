import * as d3 from 'd3'
import { flatten, concat, prop, map, propEq, filter, pluck, compose, curry } from 'ramda'
import data from './mockData'
const debug = (color = 'green') => input => {
  console.log(`%c${input}`, `color: ${color};`)
  return input
}
const db = debug()
const xKey = 'date'
const yKey = 'temperature'
const valuesKey = 'values'
console.log(data)
export const pluckX = pluck(xKey)
export const pluckY = pluck(yKey)
export const pluckValues = pluck(valuesKey)

export const x = prop(xKey)
export const y = prop(yKey)
export const values = prop(valuesKey)
export const pluckFlattenValues = compose(flatten, pluckValues)

export const getXFromSeries = compose(pluckX, pluckFlattenValues)
export const getYFromSeries = compose(pluckY, pluckFlattenValues)

export const getFilteredValues = predicate => compose(filter(predicate), pluckFlattenValues)

export const inRange = curry((range, date) => range[0] <= date && range[1] > date)

export const setNewSelection = range => oldState => {
  const inCurrentRange = inRange(range)
  const changeSelectionDatum = datum => ({ ...datum, isSelected: inCurrentRange(datum.date) })
  const setNewSeries = series => ({ ...series, values: map(changeSelectionDatum, series.values) })
  const newState = { ...oldState, data: map(setNewSeries, oldState.data) }
  return newState
}
const newData = pluckFlattenValues(data)
console.log(newData)

export const getSelected = filter(prop('isSelected'))
