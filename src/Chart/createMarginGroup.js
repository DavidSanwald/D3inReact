import * as d3 from 'd3'

function innerSize (props) {
  const { margin, outerHeight, outerWidth } = props
  const width = outerWidth - margin.left - margin.right
  const height = outerHeight - margin.top - margin.bottom
  return { width, height }
}

function createMarginGroup (selection, props) {
  const {
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
}
export { innerSize, createMarginGroup }
