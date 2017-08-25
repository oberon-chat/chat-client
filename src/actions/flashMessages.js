import uuid from '../helpers/uuid'

export const createFlashMessage = (title, messageType = 'info', description = undefined) => ({
  type: 'CREATE_FLASH_MESSAGE',
  flashMessage: {
    createdAt: Date.now(),
    id: uuid(),
    description,
    messageType,
    title
  }
})

export const showFlashMessage = (id) => ({
  type: 'SHOW_FLASH_MESSAGE',
  timestamp: Date.now(),
  id
})

export const closeFlashMessage = (id) => ({
  type: 'CLOSE_FLASH_MESSAGE',
  timestamp: Date.now(),
  id
})

export const closeAllFlashMessages = () => ({
  type: 'CLOSE_ALL_FLASH_MESSAGES'
})
