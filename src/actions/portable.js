export const closeChat = () => (dispatch) => {
  dispatch({ type: 'CLOSE_PORTABLE' })
}

export const openChat = () => (dispatch) => {
  dispatch({ type: 'OPEN_PORTABLE' })
}
