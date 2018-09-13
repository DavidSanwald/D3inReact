import React, { Component } from 'react'
import SizeDetector from './SizeDetector'
import Chart from './Chart'
import genDateValue from './dataGenerator'
import MainWrapper from './Layout/MainWrapper'
import Card from './Layout/Card'
import Title from './Layout/Title'
import { evolve, filter, compose, map, chain, mean, reduce, zipObj } from 'ramda'
import * as d3 from 'd3'
import { x, inRange, values, pluckY, pluckId, dropNEnds, getFirstSeries, getFirstLastItem, pluckX } from './dataUtils'
import { Switch, FormCheck, Select, FormCheckLabel, Checkbox, FormGroup } from '@smooth-ui/core-sc'
const GreySwitch = Switch.extend`
 .sui-switch-ball {
      color: #EEF1F5 !important;
      box-shadow-color: '#EEF1F5' !important;
    }
  `

const color = d3.scaleOrdinal()
  .range([
    '#ffb14e',
    '#ea5f94',
    '#cd34b5'
  ])
  .domain(['Haskell', 'Clojure', 'OCaml'])
function genLines (list = ['Haskell', 'Clojure', 'OCaml']) {
  return list.map((d, i) => {
    return { id: d, values: genDateValue(25, i * 100) }
  })
}
const Series = ({ checked, id, toggleCheckSeries }) => <FormCheck inline>
  <GreySwitch borderColor='#EEF1F5' color='#EEF1F5' background='#EEF1F5' backgroundColor={color(id)} name={id} checked={checked} onChange={toggleCheckSeries} />
  <FormCheckLabel htmlFor='checkboxInline1'>{id}</FormCheckLabel>
</FormCheck>
const series = genLines()
const data = chain(values, series)

const updateActive = (name, checked) => previousState => {
  return ({ ...previousState, visibilityFilter: { ...previousState.visibilityFilter, [name]: checked ? 'visible' : 'hidden' } })
}
class App extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [], range: [], visibilityFilter: {}, events: 'off' }
  }
  componentDidMount () {
    this.setState({
      activeEvents: 'none',
      data: series,
      range: d3.extent(data, x),
      visibilityFilter: reduce((acc, id) => {
        acc[id] = 'visible'
        return acc
      }, {}, pluckId(series))
    }
    )
  }

  handleBrush = range => {
    this.setState({ range })
  }

  handleSelect = e => {
    this.setState({ events: e.target.value })
  }

  toggleCheckSeries = e => {
    this.setState(updateActive(e.target.name, e.target.checked))
  }

  render () {
    const { data, range, visibilityFilter, events } = this.state
    return (
      <MainWrapper>
        <Card>

          <FormGroup style={{ marginLeft: 30, padding: 30 }}>
            {data.map(datum => (<Series key={datum.id} id={datum.id} checked={visibilityFilter[datum.id] === 'visible'} toggleCheckSeries={this.toggleCheckSeries} />))}
            <Select size='lg' onChange={this.handleSelect} placeholder='Medium' options={[
              { label: 'No Events', value: 'none' },
              { label: 'Unbirthdays', value: 'unbirthday' },
              { label: 'Birthdays', value: 'birthday' }
            ]} />
          </FormGroup>
          <SizeDetector delay={300} range={range} render={({ width, height }) => <Chart events={events} visibilityFilter={visibilityFilter} handleBrush={this.handleBrush} data={data} range={range} width={width} height={height} />} />
        </Card>
      </MainWrapper >

    )
  }
}

export default App
