
function calcInnerSize (props) {
  const { margin, outerSize } = props
  const width = outerSize.outerWidth - margin.left - margin.right
  const height = outerSize.outerHeight - margin.top - margin.bottom
  return ({ width, height })
}

function renderMarginGroup (container, props) {
  const {
    margin,
    className = 'margin-group'
  } = props

  let g = container
    .selectAll('.' + className).data([null])

  g
    .enter().append('g')
    .attr('class', className)
    .merge(g)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
}
export { calcInnerSize, renderMarginGroup }
