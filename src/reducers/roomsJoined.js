import { reduce } from 'lodash'

const initialState = {}

export const roomsJoinedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          channel: action.channel
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

export const getRoomsJoined = (state) => state.roomsJoined || {}
export const getRoom = (state, name) => getRoomsJoined(state)[name] || {}
export const getRoomChannel = (state, name) => getRoom(state, name).channel || {}

export default roomsJoinedReducer
