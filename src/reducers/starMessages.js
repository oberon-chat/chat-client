import { omit } from 'lodash'

const initialState = {

}

const starMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STAR_MESSAGE':
      return {...state, [action.messageId]: true}
    case 'UNSTAR_MESSAGE':
      return omit(state, action.messageId)
    case 'REPLACE_STAR_MESSAGES':
      return action.starredMessages
    default:
      return state
  }
}

export const getIsStarred = (state, messageId) => {
  return !!state.starMessages[messageId]
}

export default starMessagesReducer
