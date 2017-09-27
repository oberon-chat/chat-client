import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ConnectedRouter } from 'react-router-redux'
import apolloClient from './apolloClient'
import history from './history'
import store from './store'
import Layout from '../pages/Layout'
import registerServiceWorker from './registerServiceWorker'
import logoutExpiredSessions from './logoutExpiredSessions'
import { setClientType } from '../actions/client'

store.dispatch(setClientType('web'))

const target = document.getElementById('chat-root')

const App = (
  <ApolloProvider store={store} client={apolloClient}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </ApolloProvider>
)

render(App, target)
registerServiceWorker()
logoutExpiredSessions()
