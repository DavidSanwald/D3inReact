
import React, { Component } from 'react'
import { renderBrush } from './renderBrush'

class Brush extends Component {
  constructor (props) {
    super(props)
    this.nodeRef = React.createRef()
  }
  componentDidMount () {
    if (this.props.aspectRatio) {
      const chartProps = { ...this.props, height: this.props.width * this.props.aspectRatio }
      renderBrush(this.nodeRef.current, chartProps)
    } else {
      const chartProps = { ...this.props }
      renderBrush(this.nodeRef.current, chartProps)
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.aspectRatio) {
      const chartProps = { ...nextProps, height: nextProps.width * this.props.aspectRatio }
      renderBrush(this.nodeRef.current, chartProps)
    } else {
      const chartProps = { ...nextProps }
      renderBrush(this.nodeRef.current, chartProps)
    }

    return false
  }
  render () {
    return <div ref={this.nodeRef} />
  }
}

export default Brush
