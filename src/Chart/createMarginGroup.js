import * as d3 from 'd3'
function createMarginGroup (selection, props) {
  const {
    outerWidth,
    outerHeight,
    margin,
    className = 'margin-group'
  } = props

  let g = selection
    .selectAll('.' + className).data([null])
  g = g
    .enter().append('g')
    .attr('class', className)
    .merge(g)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const width = outerWidth - margin.left - margin.right
  const height = outerHeight - margin.top - margin.bottom

  return { g, width, height }
}
export { createMarginGroup }
