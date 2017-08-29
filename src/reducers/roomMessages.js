import { find, map, reduce } from 'lodash'

const initialState = {}

export const roomMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_ROOM_MESSAGE':
      const messages = (state[action.key] || []).concat(action.message)

      return {
        ...state,
        [action.key]: messages
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

export default roomMessagesReducer
