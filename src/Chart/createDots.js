import * as d3 from 'd3'
const color = {
  'Austin': '#ffd700',
  'New York': '#ffb14e',
  'San Francisco': '#fa8775'
}

function createDots (selection, props) {
  const y = d => d.temperature
  const x = d => d.date
  const key = d => d.id

  const { data, xScale, yScale } = props

  let outer = selection.selectAll('.dots')
    .data(data, d => key(d))

  let outerEnter = outer
    .enter().append('g')
    .attr('class', 'dots')

  outer = outerEnter.merge(outer)

  let inner = outer
    .selectAll('circle')
    .data(d => d.values)

  inner
    .enter()
    .append('circle')
    .data(d => d.values)
    .merge(inner)
    .attr('fill', 'red')
    .style('opacity', 1)
    .attr('r', 3)
    .attr('cx', d => xScale(x(d)))
    .attr('cy', d => yScale(y(d)))
}

export { createDots }
