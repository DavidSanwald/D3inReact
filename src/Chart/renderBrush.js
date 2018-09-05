import * as d3 from 'd3'
import { createXAxis, createYAxis } from './createAxis'
import { createLines } from './createLines'
import { createMarginGroup } from './createMarginGroup'

const margin = { top: 20, bottom: 71, left: 78, right: 20 }

const getX = d => d.date
const getY = d => d.temperature

const getAllValues = data => data.reduce((acc, curr) => acc.concat(curr.values), [])

function renderBrush (node, props) {
  const { width: outerWidth, height: outerHeight, data, handleBrush } = props
  console.log(data)
  const allValues = getAllValues(data)
  const xDomain = d3.extent(allValues, getX)
  const yDomain = d3.extent(allValues, getY)

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

  const x2Scale = d3.scaleTime()
    .range([0, width])
    .domain(xDomain)

  createXAxis(g, { xScale, height, width })
  createYAxis(g, { yScale, height, width })
  createLines(g, { xScale, yScale, data })

  const brush = d3.brushX()
    .extent([[0, 0], [width, height]])
    .on('brush', brushed)

  let brushG = g.selectAll('.brush').data([null])

  brushG.enter().append('g').attr('class', 'brush').call(brush).call(brush.move, xScale.range())

  function brushed () {
    console.log(d3.event)

    const selection = d3.event.selection
    if (selection !== null) {
      const e = selection.map(xScale.invert)
      if (d3.event.sourceEvent) {
        handleBrush(e)
      }
    }
  }
}

export { renderBrush }
