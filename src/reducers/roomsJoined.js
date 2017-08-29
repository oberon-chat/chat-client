import { reduce } from 'lodash'

const initialState = {}

export const roomsJoinedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          room: action.room
        }
      }
    case 'VIEW_ROOM':
      const addCurrentRoom = state[action.room] ? state : { ...state, [action.room]: {} }

      return reduce(addCurrentRoom, (acc, value, room) => {
        if (room === action.room) {
          acc[room] = { ...value, viewing: true, lastViewed: Date.now() }
        } else if (value.viewing) {
          acc[room] = { ...value, viewing: false, lastViewed: Date.now() }
        } else {
          acc[room] = value
        }

        return acc
      }, {})
    case 'LEAVE_ROOM':
      delete state[action.key]
      return state
    default:
      return state
  }
}

export const getRoom = (state, name) => (state.roomsJoined[name] || {}).room || {}
export const getRoomsJoined = (state) => state.roomsJoined

export default roomsJoinedReducer
