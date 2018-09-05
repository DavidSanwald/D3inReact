import * as d3 from 'd3'
const color = {
  'Austin': '#ffd700',
  'New York': '#ffb14e',
  'San Francisco': '#fa8775'
}
const inBounds = range => datum => datum.date > range[0] && datum.date < range[1]
const t = d3.transition()

function createDots (selection, props) {
  const y = d => d.temperature
  const x = d => d.date
  const key = d => d.id

  const { data, xScale, yScale, range } = props

  let outer = selection.selectAll('.dots')
    .data(data, d => key(d))

  let outerEnter = outer
    .enter().append('g')
    .attr('class', 'dots')

  let outerEnterUpdate = outerEnter.merge(outer)

  let innerUpdate = outerEnterUpdate
    .selectAll('circle')
    .data(d => d.values)

  let innerEnter = innerUpdate
    .enter()
    .append('circle')

  let innerEnterUpdate = innerEnter
    .merge(innerUpdate)

  innerEnterUpdate
    .attr('fill', 'red')
    .style('opacity', 1)
    .attr('cx', d => xScale(x(d)))
    .attr('cy', d => yScale(y(d)))
    .transition()
    .ease(d3.easeLinear)
    .attr('r', d => inBounds(range)(d) ? 10 : 2)
}

export { createDots }
