const initialState = {}

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        ...state,
        [action.key]: {
          room: action.room,
          users: action.users
        }
      }
    case 'UPDATE_ROOM_USERS':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          users: action.users
        }
      }
    default:
      return state
  }
}

export const isLoggedIn = (state) => !isEqual(initialState, state.currentUser)
export const getCurrentUser = (state) => state.currentUser
export const getCurrentUserId = (state) => parseInt(getCurrentUser(state).id, 10)
export const tokenHasExpired = (state) => {
  const expiration = state.currentUser.token_expiration

  if (!expiration) { return false }

  const asInt = parseInt(expiration, 10)
  const now = Math.floor(Date.now() / 1000)

  return now >= asInt
}

export default currentUserReducer

