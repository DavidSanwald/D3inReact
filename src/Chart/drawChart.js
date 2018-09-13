import * as d3 from 'd3'
import { renderYAxis, renderXAxisLabel, renderXAxis, renderYAxisLabel } from './axis'
import { renderLines } from './lines'
import { renderBrush } from './brush'
import { renderDots } from './dots'
import { renderMarginGroup, calcInnerSize } from './margins'
import { y, x, inRange, datumInRange, getAllPoints, pluckId } from '../dataUtils'
import { map, filter, curry } from 'ramda'

const margin = { top: 20, bottom: 71, left: 78, right: 20 }

const color = d3.scaleOrdinal()
  .range(['#ffd700',
    '#ffb14e',
    '#fa8775',
    '#ea5f94',
    '#cd34b5',
    '#9d02d7',
    '#0000ff'])

function drawChart (nodes, props) {
  const { width: outerWidthContainer, height: outerHeightContainer, data: rawData, range, handleBrush, events, visibilityFilter } = props
  const filterHidden = curry((filter, series) => filter[series.id] === 'visible')
  const allPoints = getAllPoints(rawData)
  color.domain(pluckId(rawData))

  const { nodeFocus, nodeContext } = nodes
  const outerSizeFocus = { outerWidth: outerWidthContainer, outerHeight: (2 / 3) * outerHeightContainer }
  const outerSizeContext = { outerWidth: outerWidthContainer, outerHeight: (1 / 3) * outerHeightContainer }
  const filteredData = filter(filterHidden(visibilityFilter), rawData)
  console.log(filteredData)
  const allFilteredPoints = getAllPoints(filteredData)
  const allEventsFiltered = filter(datum => datum.event === events, allFilteredPoints)
  const rootFocus = d3.select(nodeFocus)
  let svgFocus = rootFocus.selectAll('svg').data([null])
  svgFocus = svgFocus.enter()
    .append('svg')
    .merge(svgFocus).attr('width', outerSizeFocus.outerWidth)
    .attr('height', outerSizeFocus.outerHeight)

  const rootContext = d3.select(nodeContext)

  let svgContext = rootContext.selectAll('svg').data([null])

  renderMarginGroup(svgFocus, { margin })

  const innerSizeFocus = calcInnerSize({ margin, outerSize: outerSizeFocus })
  const containerFocus = rootFocus.select('.margin-group')
  const focus = { g: containerFocus, width: innerSizeFocus.width, height: innerSizeFocus.height }

  svgContext = svgContext.enter()
    .append('svg')
    .attr('height', outerSizeContext.outerHeight)
    .attr('width', outerSizeContext.outerWidth)

  renderMarginGroup(svgContext, { margin })

  const innerSizeContext = calcInnerSize({ margin, outerSize: outerSizeContext })
  const containerContext = rootContext.select('.margin-group')
  const context = { g: containerContext, width: innerSizeContext.width, height: innerSizeContext.height }
  const xDomain = d3.extent(allFilteredPoints, x)

  focus.yScale = d3.scaleLinear()
    .range([focus.height, 0])
    .domain([0, d3.max(allFilteredPoints, y)])

  context.yScale = d3.scaleLinear()
    .range([context.height, 0])
    .domain([0, d3.max(allFilteredPoints, y)])

  focus.xScale = d3.scaleTime()
    .range([0, focus.width])
    .domain(xDomain)

  context.xScale = d3.scaleTime()
    .range([0, context.width])
    .domain(xDomain)

  const selectedBrushData = filter(d => d.state === 'selected', allFilteredPoints)

  const brushDataExtent = map(context.xScale, d3.extent(selectedBrushData, x))
  renderXAxis(focus, { ...focus })
  renderXAxis(context, { ...context })
  renderYAxis(focus, { ...focus })
  renderYAxis(context, { ...context })
  renderYAxisLabel(focus, { ...focus })
  renderXAxisLabel(focus, { ...focus })
  renderLines(focus, { ...focus, color, data: filteredData })

  renderLines(context, { ...context, color, data: filteredData })
  renderBrush(context, { ...context, brushDataExtent, handleBrush })
  renderDots(focus, { ...focus, data: allEventsFiltered })
}
export { drawChart }
