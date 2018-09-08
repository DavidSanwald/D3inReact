import React, { Component } from 'react'
import { renderChart } from './renderChart'
import { renderBrush } from './renderBrush'

class Chart extends Component {
  constructor (props) {
    super(props)
    this.nodeRef = React.createRef()
    this.nodeRef2 = React.createRef()
  }
  componentDidMount () {
    renderChart(this.nodeRef.current, { ...this.props, height: 2 * this.props.height / 3 })
    renderBrush(this.nodeRef2.current, { ...this.props, height: this.props.height / 3 })
  }
  shouldComponentUpdate (nextProps, nextState) {
    renderChart(this.nodeRef.current, { ...nextProps, height: 2 * nextProps.height / 3 })
    renderBrush(this.nodeRef2.current, { ...nextProps, height: nextProps.height / 3 })

    return false
  }
  render () {
    return <div><div ref={this.nodeRef} /> <div ref={this.nodeRef2} /></div>
  }
}

export default Chart
