const initialState = {}

export const roomMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ROOM_MESSAGE':
      const messages = (state[action.key] || []).concat(action.message)

      return {
        ...state,
        [action.key]: messages
      }
    default:
      return state
  }
}

export const getRoomMessages = (state, name) => state.roomMessages[name] || []

export default roomMessagesReducer
