import * as d3 from 'd3'
import { createYAxisLabelText, createXAxis, createYAxis } from './createAxis'
import { createLines } from './createLines'
import { createDots } from './createDots'
import { createMarginGroup } from './createMarginGroup'

const margin = { top: 20, bottom: 71, left: 78, right: 20 }

const getX = d => d.date
const getY = d => d.temperature

const getAllValues = data => data.reduce((acc, curr) => acc.concat(curr.values), [])

function renderChart (node, props) {
  const { width: outerWidth, height: outerHeight, range, data } = props
  const allValues = getAllValues(data)
  const xDomain = d3.extent(allValues, getX)
  const yDomain = d3.extent(allValues, getY)

  const newRange = range || xDomain

  const root = d3.select(node)

  let svg = root.selectAll('svg').data([null])

  svg = svg.enter().append('svg').merge(svg).attr('width', outerWidth).attr('height', outerHeight)

  const { g, width, height } = createMarginGroup(svg, { outerWidth, outerHeight, margin })

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain)

  const xScale = d3.scaleTime()
    .range([0, width])
    .domain(xDomain)

  createXAxis(g, { xScale, height, width })
  createYAxis(g, { yScale, height, width })
  createYAxisLabelText(g, { yScale, height, width })
  createLines(g, { xScale, yScale, data })
  createDots(g, { xScale, yScale, data, range: newRange })
}
export { renderChart }
