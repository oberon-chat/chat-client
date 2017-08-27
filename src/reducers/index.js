import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import apolloClient from '../app/apolloClient'
import currentUserReducer from './currentUser'
import flashMessagesReducer from './flashMessages'
import roomsReducer from './rooms'
import roomsJoinedReducer from './roomsJoined'
import roomMessagesReducer from './roomMessages'
import roomUsersReducer from './roomUsers'
import socketReducer from './socket'

export default combineReducers({
  apollo: apolloClient.reducer(),
  currentUser: currentUserReducer,
  flashMessages: flashMessagesReducer,
  form: reduxFormReducer,
  rooms: roomsReducer,
  roomsJoined: roomsJoinedReducer,
  roomMessages: roomMessagesReducer,
  roomUsers: roomUsersReducer,
  routing: routerReducer,
  socket: socketReducer
})
