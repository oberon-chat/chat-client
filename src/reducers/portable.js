const initialState = {
  activeRoom: null,
  isOpen: false
}

const portableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PORTABLE_OPEN':
      return {
        ...state,
        isOpen: true
      }
    case 'PORTABLE_CLOSE':
      return {
        ...state,
        isOpen: false
      }
    case 'PORTABLE_ACTIVE_ROOM':
      return {
        ...state,
        activeRoom: action.room
      }
    default:
      return state
  }
}

export const getActiveRoom = (state) => (state.portable || {}).activeRoom
export const getIsOpen = (state) => (state.portable || {}).isOpen

export default portableReducer
