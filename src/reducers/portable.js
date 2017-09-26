const initialState = {
  activeRoom: null,
  lastActivity: null,
  isOpen: false
}

const recentActivityThreshold = 15 * 60 * 1000 // 15 minutes

const portableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROOM_MESSAGE':
      return {
        ...state,
        lastActivity: Date.now()
      }
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
        activeRoom: action.room,
        lastActivity: Date.now()
      }
    default:
      return state
  }
}

export const getActiveRoom = (state) => (state.portable || {}).activeRoom
export const getLastActivity = (state) => (state.portable || {}).lastActivity || 0
export const getHasRecentActivity = (state) => getLastActivity(state) > Date.now() - recentActivityThreshold
export const getIsOpen = (state) => (state.portable || {}).isOpen

export default portableReducer
