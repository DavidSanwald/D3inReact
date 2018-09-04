import React, { Component } from 'react'
import SizeDetector from './SizeDetector'
import Chart from './Chart'
import data from './mockData'
import Item from './Item'
import MainWrapper from './Layout/MainWrapper'
import Card from './Layout/Card'
import Brush from './Chart/Brush'

import './App.css'

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

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [] }
  }
  componentDidMount () {
    this.setState({ data: data })
  }
  toggleDatum = id => () => {
    this.setState(toggleByID(id))
  }
  render () {
    return (
      <MainWrapper>
        <Card>
          {this.state.data.map(datum => <Item name={datum.id} key={datum.id} handleClick={this.toggleDatum} />)}
          <SizeDetector delay={300} render={({ width, height }) => (<div><Chart data={this.state.data.filter(datum => datum.status === 'visible')} width={width} height={3 * height / 4} aspectRatio={0.5} />
            <Brush data={this.state.data.filter(datum => datum.status === 'visible')} width={width} height={height / 4} /></div>)} />
        </Card>
      </MainWrapper>

    )
  }
}

export default App
