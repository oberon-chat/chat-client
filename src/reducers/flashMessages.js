import { filter, reduce } from 'lodash'

const closeMessages = (messages) => (
  reduce(messages, (acc, item) => {
    item.closedAt = Date.now()

    acc[item.id] = item

    return acc
  }, {})
)

const flashMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_FLASH_MESSAGE': {
      const {flashMessage} = action

      return {...state, [flashMessage.id]: flashMessage}
    }
    case 'SHOW_FLASH_MESSAGE': {
      const {id, timestamp} = action
      const message = state[id]

      message.shownAt = timestamp

      return {...state, [id]: message}
    }
    case 'CLOSE_FLASH_MESSAGE': {
      const {id, timestamp} = action
      const message = state[id]

      message.closedAt = timestamp

      return {...state, [id]: message}
    }
    case '@@router/LOCATION_CHANGE': {
      const shown = filter(state, (item) => (item.shownAt && !item.closedAt))
      const closed = closeMessages(shown)

      return {...state, ...closed}
    }
    case 'CLOSE_ALL_FLASH_MESSAGES': {
      const closed = closeMessages(state)

      return {...state, ...closed}
    }
    default:
      return state
  }
}

export const getFlashMessages = (state) => state.flashMessages
export const getOpenFlashMessages = (state) => filter(state.flashMessages, (message) => !message.closedAt)
export const getClosedFlashMessages = (state) => filter(state.flashMessages, (message) => message.closedAt)

export default flashMessagesReducer
