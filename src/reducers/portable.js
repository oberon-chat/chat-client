const initialState = {
  isOpen: false
}

const portableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_PORTABLE':
      return {
        ...state,
        isOpen: true
      }
    case 'CLOSE_PORTABLE':
      return {
        ...state,
        isOpen: false
      }
    default:
      return state
  }
}

export const getIsOpen = (state) => (state.portable || {}).isOpen

export default portableReducer
