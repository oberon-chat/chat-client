const initialState = {}

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        ...state,
        [action.key]: {
          room: action.room,
          users: {}
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

export const getRoom = (state, name) => state.rooms[name]
export const getRoomUsers = (state, name) => state.rooms[name] ? state.rooms[name].users : {}

export default roomsReducer
