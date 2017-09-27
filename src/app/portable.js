import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ConnectedRouter } from 'react-router-redux'
import apolloClient from './apolloClient'
import history from './history'
import store from './store'
import Portable from '../pages/portable'
import { setClientType } from '../actions/client'

store.dispatch(setClientType('portable'))

const target = document.getElementById('chat-root')

const App = (
  <ApolloProvider store={store} client={apolloClient}>
    <ConnectedRouter history={history}>
      <Portable />
    </ConnectedRouter>
  </ApolloProvider>
)

render(App, target)
