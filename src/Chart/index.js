import React, { Component } from 'react'
import { drawChart } from './drawChart'

class Chart extends Component {
  constructor (props) {
    super(props)
    this.nodeRefFocus = React.createRef()
    this.nodeRefContext = React.createRef()
  }
  componentDidMount () {
    drawChart({ nodeFocus: this.nodeRefFocus.current, nodeContext: this.nodeRefContext.current }, { ...this.props, height: this.props.height })
  }
  shouldComponentUpdate (nextProps, nextState) {
    drawChart({ nodeFocus: this.nodeRefFocus.current, nodeContext: this.nodeRefContext.current }, { ...nextProps, height: nextProps.height })

    return false
  }
  render () {
    return <div><div ref={this.nodeRefFocus} /> <div ref={this.nodeRefContext} /></div>
  }
}

export default Chart
