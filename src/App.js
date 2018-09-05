import * as d3 from 'd3'
import React, { Component } from 'react'
import SizeDetector from './SizeDetector'
import Chart from './Chart'
import data from './mockData'
import Item from './Item'
import MainWrapper from './Layout/MainWrapper'
import Card from './Layout/Card'
import Brush from './Chart/Brush'

import './App.css'
const parseTime = d3.timeParse('%Y%m%d')
const transformDatum = d => ({ ...d, date: parseTime(d.date) })
const transformSeries = series => ({ ...series, values: series.values.map(transformDatum) })

const toggleStatus = datum => {
  const newStatus = datum.status === 'visible' ? 'hidden' : 'visible'
  const newDatum = { ...datum, status: newStatus }
  console.log(newDatum)
  return newDatum
}
const toggleByID = id => state => {
  const newData = state.data.map(datum => datum.id === id ? toggleStatus(datum) : datum)
  return ({ ...state, data: newData })
}

const inBounds = range => datum => datum.date > range[0] && datum.date < range[1]
class App extends Component {
  constructor (props) {
    super(props)
    this.state = { range: undefined, data: [] }
  }
  componentDidMount () {
    this.setState({ data: data.map(transformSeries) })
  }

  handleBrush = e => {
    this.setState({ range: e })
  }
  toggleDatum = id => () => {
    this.setState(toggleByID(id))
  }
  render () {
    const data = this.state.data.map(datum => ({ ...datum, values: datum.values }))
    return (
      <MainWrapper>
        <Card>
          {this.state.data.map(datum => <Item name={datum.id} key={datum.id} handleClick={this.toggleDatum} />)}
          <SizeDetector delay={300} render={({ width, height }) => (<div><Chart range={this.state.range} data={this.state.data.filter(datum => datum.status === 'visible')} width={width} height={2 * height / 3} aspectRatio={0.5} />
            <Brush data={this.state.data.filter(datum => datum.status === 'visible')} handleBrush={this.handleBrush} width={width} height={height / 3} /></div>)} />
        </Card>
      </MainWrapper>

    )
  }
}

export default App
