import * as d3 from 'd3'
import { x, y, values } from './../dataUtils'
const color = {
  'Austin': '#ffd700',
  'New York': '#ffb14e',
  'San Francisco': '#fa8775'
}
function createDots (selection, props) {
  const { data, xScale, yScale } = props

  let outer = selection.selectAll('.dots')
    .data(data)

  let outerEnter = outer
    .enter().append('g')
    .attr('class', 'dots')

  let outerEnterUpdate = outerEnter.merge(outer)

  let innerUpdate = outerEnterUpdate
    .selectAll('circle')
    .data(values)

  let innerEnter = innerUpdate
    .enter()
    .append('circle')

  let innerEnterUpdate = innerEnter
    .merge(innerUpdate)

  innerEnterUpdate
    .style('opacity', 1)
    .attr('cx', d => xScale(x(d)))
    .attr('cy', d => yScale(y(d)))
    .transition()
    .ease(d3.easeLinear)
    .attr('r', d => d.isSelected ? 10 : 2)
  //    .attr('fill', d => d.isSelected ? 'green' : 'blue')
}

export { createDots }
