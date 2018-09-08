import * as d3 from 'd3'
import { createXAxis, createYAxis } from './createAxis'
import { createLines } from './createLines'
import { createBrush } from './createBrush'
import { createMarginGroup, innerSize } from './createMarginGroup'
import { getYFromSeries, getXFromSeries, getFilteredValues, x, y, pluckX } from './../dataUtils'
import { map, compose } from 'ramda'

const margin = { top: 20, bottom: 71, left: 78, right: 20 }

function renderBrush (node, props) {
  const { width: outerWidth, height: outerHeight, data, handleBrush } = props

  const root = d3.select(node)

  let svg = root.selectAll('svg').data([null])

  svg = svg.enter().append('svg').merge(svg).attr('width', outerWidth).attr('height', outerHeight)

  createMarginGroup(svg, { margin })

  const g = root.select('.margin-group')

  const { width, height } = innerSize({ margin, outerWidth, outerHeight })

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.extent(getYFromSeries(data))[1]])

  const xScale = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(getXFromSeries(data)))

  const filtered = getFilteredValues(d => d.isSelected)(data)

  const extent = map(xScale, d3.extent(filtered, x))
  createXAxis(g, { xScale, height, width })
  createYAxis(g, { yScale, height, width })
  createLines(g, { xScale, yScale, data })
  createBrush(g, { xScale, yScale, height, width, handleBrush, margin, extent })
}

export { renderBrush }
