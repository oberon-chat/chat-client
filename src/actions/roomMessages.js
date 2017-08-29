import { getRoom } from '../reducers/roomsJoined'
import { getRoomMessage } from '../reducers/roomMessages'

export const receiveMessage = (roomName, message) => ({
  type: 'RECEIVE_ROOM_MESSAGE',
  key: roomName,
  message: message
})

export const replaceMessage = (roomName, message) => ({
  type: 'REPLACE_ROOM_MESSAGE',
  key: roomName,
  message: message
})

export const replaceMessages = (roomName, messages) => ({
  type: 'REPLACE_ROOM_MESSAGES',
  key: roomName,
  messages: messages
})

export const submitMessage = (roomName, message) => (dispatch, getState) => {
  const room = getRoom(getState(), roomName)

  room.push('message:new', message)
}

export const editMessage = (roomName, messageId, body) => (dispatch, getState) => {
  const state = getState()
  const room = getRoom(state, roomName)
  const message = getRoomMessage(state, roomName, messageId)
  const updatedMessage = {
    ...message,
    body: body
  }

  room.push('message:update', updatedMessage)
}
