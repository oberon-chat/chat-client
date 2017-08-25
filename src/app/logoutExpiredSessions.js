import store from './store'
import { logout } from '../actions/currentUser'
import { tokenHasExpired } from '../reducers/currentUser'

export const logoutExpiredSessions = () => {
  if (tokenHasExpired(store.getState())) {
    store.dispatch(logout())
  }
}

export default logoutExpiredSessions
