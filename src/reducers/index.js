import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import apolloClient from '../app/apolloClient'
import currentUserReducer from './currentUser'
import flashMessagesReducer from './flashMessages'

export default combineReducers({
  apollo: apolloClient.reducer(),
  currentUser: currentUserReducer,
  flashMessages: flashMessagesReducer,
  form: reduxFormReducer,
  routing: routerReducer
})
