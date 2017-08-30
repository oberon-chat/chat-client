const initialState = {
  channel: undefined,
  rooms: {}
}

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOIN_ROOMS':
      return {
        ...state,
        channel: action.channel
      }
    case 'UPDATE_ROOMS':
      return {
        ...state,
        rooms: action.rooms
      }
    default:
      return state
  }
}

export const getRoomsChannel = (state) => (state.rooms || {}).channel || {}
export const getRooms = (state) => (state.rooms || {}).rooms || {}

export default roomsReducer
