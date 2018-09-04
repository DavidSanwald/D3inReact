
import * as d3 from 'd3'

function createXAxis (selection, props = {}) {
  const { width, height, xScale, xAxisTickFontFill = '#8E8883', xAxisTickFontSize = '12px', xAxisTickLineStroke = '#C0C0BB', xAxisDomainLineStroke = '#C0C0BB', xAxisLabelFontSize = '16px', xAxisLabelFill = '#635F5D', xAxisLabel = 'Date', xAxisLabelOffset = 52, xAxisTickDensity = 70 } = props
  const xAxis = d3.axisBottom(xScale)
    .ticks(width / xAxisTickDensity)
    .tickFormat(d3.timeFormat('%b'))

  let xAxisG = selection.selectAll('.x-axis').data([null])

  xAxisG = xAxisG
    .enter().append('g')
    .attr('class', 'x-axis')
    .merge(xAxisG)
    .attr('transform', `translate(0,${height})`)

  xAxisG
    .transition()
    .call(xAxis)

  xAxisG
    .selectAll('.tick text')
    .style('font-size', xAxisTickFontSize)
    .attr('fill', xAxisTickFontFill)

  xAxisG
    .selectAll('.tick line')
    .attr('stroke', xAxisTickLineStroke)

  xAxisG
    .select('.domain')
    .attr('stroke', xAxisDomainLineStroke)

  const xAxisLabelText = xAxisG.selectAll('.axis-label').data([null])
  xAxisLabelText
    .enter().append('text')
    .attr('class', 'axis-label')
    .merge(xAxisLabelText)
    .attr('fill', xAxisLabelFill)
    .text(xAxisLabel)
    .attr('x', width / 2)
    .attr('y', xAxisLabelOffset)
    .style('font-size', xAxisLabelFontSize)
}

function createYAxis (selection, props) {
  const { width, height, yScale, yAxisTickFontFill = '#8E8883', yAxisTickFontSize = '12px', yAxisTickLineStroke = '#C0C0BB', yAxisDomainLineStroke = '#C0C0BB', yAxisLabelFontSize = '16px', yAxisLabelFill = '#635F5D', yAxisLabel = 'Temperature, ºF', yAxisLabelOffset = 44, yAxisTickDensity = 70 } = props
  const yAxis = d3.axisLeft(yScale).ticks(height / yAxisTickDensity)

  let yAxisG = selection.selectAll('.y-axis').data([null])

  yAxisG = yAxisG
    .enter().append('g')
    .attr('class', 'y-axis')
    .merge(yAxisG)

  yAxisG
    .transition()
    .call(yAxis)

  yAxisG
    .selectAll('.tick text')
    .style('font-size', yAxisTickFontSize)
    .attr('fill', yAxisTickFontFill)
  yAxisG
    .selectAll('.tick line')
    .attr('stroke', yAxisTickLineStroke)
  yAxisG
    .select('.domain')
    .attr('stroke', yAxisDomainLineStroke)

  const yAxisLabelText = yAxisG.selectAll('.axis-label').data([null])
  yAxisLabelText
    .enter().append('text')
    .attr('class', 'axis-label')
    .merge(yAxisLabelText)
    .attr('fill', yAxisLabelFill)
    .text(yAxisLabel)
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -yAxisLabelOffset)
    .style('font-size', yAxisLabelFontSize)
}

export { createYAxis, createXAxis }
