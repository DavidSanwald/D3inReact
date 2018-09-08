import * as d3 from 'd3'
import { createYAxisLabelText, createXAxisLabelText, createXAxis, createYAxis } from './createAxis'
import { createLines } from './createLines'
import { createDots } from './createDots'
import { createMarginGroup, innerSize } from './createMarginGroup'
import { getXFromSeries, getYFromSeries } from './../dataUtils'

const margin = { top: 20, bottom: 71, left: 78, right: 20 }

function renderChart (node, props) {
  const { width: outerWidth, height: outerHeight, data } = props

  const root = d3.select(node)

  let svg = root.selectAll('svg').data([null])

  svg = svg.enter().append('svg').merge(svg).attr('width', outerWidth).attr('height', outerHeight)

  const { width, height } = innerSize({ margin, outerWidth, outerHeight })

  createMarginGroup(svg, { margin })

  const g = root.select('.margin-group')

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.extent(getYFromSeries(data))[1]])

  const xScale = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(getXFromSeries(data)))

  createXAxis(g, { xScale, height, width })
  createYAxis(g, { yScale, height, width })
  createYAxisLabelText(g, { yScale, height, width })
  createXAxisLabelText(g, { xScale, height, width })
  createLines(g, { xScale, yScale, data })
  createDots(g, { xScale, yScale, data })
}
export { renderChart }
