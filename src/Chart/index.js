import React, { Component } from 'react'
import { renderChart } from './renderChart'

class Chart extends Component {
  constructor (props) {
    super(props)
    this.nodeRef = React.createRef()
  }
  componentDidMount () {
    renderChart(this.nodeRef.current, this.props)
  }
  shouldComponentUpdate (nextProps, nextState) {
    console.log('render')
    renderChart(this.nodeRef.current, nextProps)

    return false
  }
  render () {
    return <div ref={this.nodeRef} />
  }
}

export default Chart
