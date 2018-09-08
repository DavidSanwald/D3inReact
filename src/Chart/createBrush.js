import * as d3 from 'd3'
import { map } from 'ramda'

function createBrush (selection, props) {
  const { xScale, handleBrush, extent, yScale } = props
  const initY = yScale.range()
  const brush = d3.brushX().on('brush', brushed).extent([[0, 0], [xScale.range()[1], initY[0]]])

  let brushG = selection.selectAll('.brush').data([null])
  let brushGMerge = brushG.enter().append('g').attr('class', 'brush').merge(brushG).call(brush) // .call(brush.move, extent)

  const currentSelection = d3.brushSelection(d3.select('.brush').node())
  if (!currentSelection || isNaN(currentSelection[0])) {
    if (currentSelection) {
      handleBrush(xScale.domain())
    }
    brushGMerge.call(brush.move, extent)
  } else {
    const sameDimensions = (Math.abs(currentSelection[0] - extent[0]) + Math.abs(currentSelection[1] - extent[1])) < 10
    if (!sameDimensions) { brushGMerge.call(brush.move, extent) }
  }
  function brushed () {
    const selection = d3.event.selection
    if (isNaN(selection[0])) {
      handleBrush(map(xScale.invert, extent))
    } else {
      const e = selection.map(xScale.invert)
      handleBrush(e)
    }
  }
}

export { createBrush }
