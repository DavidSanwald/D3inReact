import * as d3 from 'd3'
const color = {
  'Austin': '#ffd700',
  'New York': '#ffb14e',
  'San Francisco': '#fa8775'
}

function createLines (selection, props) {
  const y = d => d.temperature
  const x = d => d.date
  const key = d => d.id

  const { data, xScale, yScale } = props

  const line = d3
    .line()
    .x(d => xScale(x(d)))
    .y(d => yScale(y(d)))
    .curve(d3.curveCatmullRom.alpha(0.5))

  let linesUpdate = selection.selectAll('.line')
    .data(data, d => key(d))

  let linesEnter = linesUpdate
    .enter()
    .append('g')
    .append('path')

  linesEnter
    .style('opacity', 0)
    .transition()
    .style('opacity', 1)

  let linesExit = linesUpdate.exit()

  linesExit
    .transition()
    .style('opacity', 0)
    .attr('stroke-width', 0)
    .remove()

  let linesMerged = linesUpdate
    .merge(linesEnter)

  linesMerged
    .transition()
    .attr('class', 'line')
    .attr('fill', 'none')
    .style('opacity', 1)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1)
    .attr('stroke', d => color[d.id])
    .attr('d', d => line(d.values))

  return linesMerged
}

export { createLines }
