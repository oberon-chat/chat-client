import { getRoomInstance } from '../reducers/rooms'

export const receiveMessage = (roomName, message) => ({
  type: 'RECEIVE_ROOM_MESSAGE',
  key: roomName,
  message: message
})

export const replaceMessages = (roomName, messages) => ({
  type: 'REPLACE_ROOM_MESSAGES',
  key: roomName,
  messages: messages
})

export const submitMessage = (roomName, message) => (dispatch, getState) => {
  const room = getRoomInstance(getState(), roomName)

  room.push('message:new', message)
}
