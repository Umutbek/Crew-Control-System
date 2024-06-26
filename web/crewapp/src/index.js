import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import 'core-js'
import './polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import Providers from "./Providers";

ReactDOM.render(
  <Providers>
    <App/>
  </Providers>,
document.getElementById('root')
)