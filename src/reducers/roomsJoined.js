const initialState = {}

export const roomsJoinedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        ...state,
        [action.key]: action.room
      }
    case 'LEAVE_ROOM':
      delete state[action.key]
      return state
    default:
      return state
  }
}

export const getRoom = (state, name) => state.roomsJoined[name] || {}
export const getRoomsJoined = (state) => state.roomsJoined

export default roomsJoinedReducer
