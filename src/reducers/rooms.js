const initialState = {}

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ROOMS':
      return action.rooms
    default:
      return state
  }
}

export const getRooms = (state) => state.rooms

export default roomsReducer
