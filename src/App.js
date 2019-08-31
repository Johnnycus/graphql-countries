import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle, theme } from './theme'

import Header from './components/Header'
import Home from './components/Home'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />

      <Header />

      <Route exact path="/" component={Home} />
      <Route exact path="/countries" component={Countries} />
      <Route path="/countries/:code" component={Country} />
    </Router>
  </ThemeProvider>
)

export default App
