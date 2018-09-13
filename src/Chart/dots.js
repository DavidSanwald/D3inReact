import * as d3 from 'd3'
import { x, y } from '../dataUtils'

const getRadius = ({ event }) => event === 'unbirthday' ? 9 : 4
const getColor = ({ event }) => event === 'unbirthday' ? '#ffb14e' : '#9d02d7'
const getOpacity = ({ event }) => event === 'unbirthday' ? 0.5 : 0.8
const getStrokeOpacity = ({ event }) => event === 'unbirthday' ? 0.3 : 0.5

function renderDots ({ g }, props) {
  const { data, xScale, yScale } = props
  console.log(data)

  let container = g.selectAll('.dots').data([null])

  container.enter().append('g').attr('class', 'dots').merge(container)

  let update = container.selectAll('circle').data(data)

  let enter = update
    .enter().append('circle')

  let enterUpdate = enter
    .merge(update)

  enterUpdate
    .style('fill-opacity', 1)
    .attr('stroke-opacity', '0')
    .transition()
    .ease(d3.easeBackOut)
    .attr('cx', d => xScale(x(d)))
    .attr('cy', d => yScale(y(d)))
    .attr('r', getRadius)
    .attr('fill', getColor)
    .style('fill-opacity', getOpacity)
    .attr('stroke', getColor)
    .attr('stroke-opacity', getStrokeOpacity)
}

export { renderDots }
