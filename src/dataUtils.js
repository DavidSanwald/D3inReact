import * as d3 from 'd3'
import { prop, curry, pluck, compose, head, takeLast, drop, dropLast, converge, chain } from 'ramda'

const xKey = 'date'
const yKey = 'value'
const valuesKey = 'values'
const idKey = 'id'

export const x = prop(xKey)
export const y = prop(yKey)
export const values = prop(valuesKey)
export const id = prop(idKey)

export const pluckY = pluck(yKey)
export const pluckX = pluck(xKey)
export const pluckId = pluck(idKey)

export const getAllPoints = chain(values)

export const getFirstSeries = head
export const getFirstItem = compose(head)

export const getLastItem = compose(head, takeLast(1))
export const dropNEnds = n => compose(drop(n), dropLast(n))

export const getFirstLastItem = compose(converge((...xs) => xs, [getFirstItem, getLastItem]))
export const inRange = curry((range, date) => range[0] <= date && date <= range[1])

export const datumInRange = range => compose(inRange(range), x)
