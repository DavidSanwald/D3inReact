import * as d3 from 'd3'
import { map } from 'ramda'
const debug = thing => {
  console.log(thing)
  return thing
}
function renderBrush ({ g }, props) {
  const { xScale, handleBrush, brushDataExtent, yScale } = props
  const yDomain = yScale.range()
  const xDomain = xScale.range()
  const brush = d3.brushX().on('brush', brushed).extent([[0, 0], [xDomain[1], yDomain[0]]]).handleSize(8)

  let brushG = g.selectAll('.brush').data([null])
  let brushGMerge = brushG.enter().append('g').attr('class', 'brush').merge(brushG).call(brush)
  brushGMerge.selectAll('.handle').attr('fill', '#9d02d7').style('opacity', 0.6).style('rx', 10)
  const currentSelection = d3.brushSelection(d3.select('.brush').node())
  if (!currentSelection) {
    // handleBrush(xScale.domain())
  } else {
    const sameDimensions = (debug((Math.abs(currentSelection[0] - brushDataExtent[0]) + (Math.abs(currentSelection[1] - brushDataExtent[1]))) < 100))
    //  if (!sameDimensions) { brushGMerge.call(brush.move, brushDataExtent) }
  }
  function brushed () {
    const currentBrushPixel = d3.event.selection
    const currentBrushDates = map(xScale.invert, currentBrushPixel)
    handleBrush(currentBrushDates)
  }
}

export { renderBrush }
