import { interpolatePath } from 'd3-interpolate-path'
import * as d3 from 'd3'
import { x, y, values, datumInRange, id } from './../dataUtils'

function renderLines ({ g }, props) {
  const { data, color, xScale, yScale } = props

  const line = d3
    .line()
    .x(d => xScale(x(d)))
    .y(d => yScale(y(d)))

  let linesUpdate = g.selectAll('.line')
    .data(data, d => d.id)

  linesUpdate.exit()
    .transition()
    .style('opacity', 0)
    .attr('stroke-width', 0)
    .remove()

  let linesEnter = linesUpdate
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(d.values))
    .style('opacity', 0)
    .attr('stroke-width', 1)
    .transition()
    .style('opacity', 1)

  let linesMerged = linesUpdate
    .merge(linesEnter)

  linesMerged
    .attr('stroke', d => color(id(d)))
    .attr('class', 'line')
    .transition()
    .attr('d', d => line(d.values))
    .attr('fill', 'none')
    .style('opacity', 1)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 5)

  return linesMerged
}

export { renderLines }
