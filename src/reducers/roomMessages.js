import { clone, find, map, reduce, reverse } from 'lodash'

const initialState = {}

export const roomMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROOM_MESSAGE':
      const current = state[action.key] || []
      const next = find(current, (message) => message.id === action.message.id)
        ? current
        : current.concat(action.message)

      return {
        ...state,
        [action.key]: next
      }
    case 'REPLACE_ROOM_MESSAGES':
      return {
        ...state,
        [action.key]: action.messages || []
      }
    case 'REPLACE_ROOM_MESSAGE':
      const updated = map(state[action.key], (message) => (
        message.id === action.message.id ? action.message : message
      ))

      return {
        ...state,
        [action.key]: updated
      }
    case 'REMOVE_ROOM_MESSAGE':
      const removed = reduce(state[action.key], (acc, message) => (
        message.id === action.message.id ? acc : acc.concat(message)
      ), [])

      return {
        ...state,
        [action.key]: removed
      }
    default:
      return state
  }
}

export const getRoomMessages = (state, name) => state.roomMessages[name] || []
export const getRoomMessage = (state, name, id) => (
  find(state.roomMessages[name], (message) => message.id === id) || {}
)
export const getLastRoomMessage = (state, name, user) => (
  find(reverse(clone(state.roomMessages[name])), (message) => message.user.id === user.id) || {}
)

export default roomMessagesReducer
