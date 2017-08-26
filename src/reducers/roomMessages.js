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
    default:
      return state
  }
}

export const getRoomMessages = (state, name) => state.roomMessages[name] || []

export default roomMessagesReducer
