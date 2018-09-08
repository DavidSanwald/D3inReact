import * as d3 from 'd3'
import React, { Component } from 'react'
import SizeDetector from './SizeDetector'
import Chart from './Chart'
import data from './mockData'
import MainWrapper from './Layout/MainWrapper'
import Card from './Layout/Card'
import Title from './Layout/Title'
import { evolve, prop, filter, compose, assoc, lensPath, lensIndex, mean, lensProp, view, set, over, map, both } from 'ramda'
import { getXFromSeries, setNewSeries, setNewSelection, getYFromSeries, inRange } from './dataUtils'

import './App.css'
const timeParser = d3.timeParse('%Y%m%d')
const parseDatum = evolve({ date: timeParser })
const initSelected = assoc('isSelected', true)
const initDatum = compose(parseDatum, initSelected)
const initSeries = evolve({ values: map(initDatum) })

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [] }
  }
  componentDidMount () {
    this.setState({ data: map(initSeries, data) })
  }

  handleBrush = range => {
    this.setState(setNewSelection(range))
  }

  render () {
    const { data } = this.state
    const dataMean = 5
    return (
      <MainWrapper>
        <Card>
          <Title>{dataMean.toFixed(2)}</Title>
          <SizeDetector delay={300} render={({ width, height }) => (this.state.data.length > 0
            ? <Chart handleBrush={this.handleBrush} data={data} width={width} height={height} aspectRatio={0.5} /> : null
          )} />
        </Card>
      </MainWrapper>

    )
  }
}

export default App
