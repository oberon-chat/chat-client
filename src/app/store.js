import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import apolloClient from './apolloClient'
import history from './history'
import rootReducer from '../reducers'

const initialState = {}
const enhancers = [
  persistState('currentUser', {key: 'chat'})
]
const middleware = [
  thunk,
  routerMiddleware(history),
  apolloClient.middleware()
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
