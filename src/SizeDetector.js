import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

class SizeDetector extends Component {
  resize = debounce((size) => {
    const renderElement = 'prop'
    const newSize = { width: Math.trunc(size.width), height: Math.trunc(size.height) }
    this.setState({ size: newSize, renderElement })
  }, this.props.delay)

  constructor (props) {
    super(props)
    this.nodeRef = React.createRef()
    this.state = {
      renderElement: 'dummy',
      size: { width: undefined, height: undefined }
    }
  }

  componentDidMount () {
    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        this.resize({ width, height })
      }
    })
    const node = this.nodeRef.current
    if (node) {
      this.ro.observe(node)
    }
    this.resize()
  }
  componentWillUnmount () {
    this.ro.disconnect()
  }

  render () {
    return (
      <div ref={this.nodeRef} style={{ width: '100%', height: '100%' }} >
        {
          this.state.renderElement === 'dummy' ? <div />
            : this.props.render(this.state.size)
        }
      </div>
    )
  }
}
export default SizeDetector
