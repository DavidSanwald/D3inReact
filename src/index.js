import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { injectGlobal } from 'styled-components'
import { globalStyle } from '@smooth-ui/core-sc'

injectGlobal`${globalStyle}`
ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
