const initialState = {}

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        ...state,
        [action.key]: action.room
      }
    default:
      return state
  }
}

export const getRoom = (state, name) => state.rooms[name]

export default roomsReducer
