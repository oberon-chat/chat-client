import { Presence } from 'phoenix'
import { getRoomInstance, getRoomUsers } from '../reducers/rooms'
import { getSocketConnection } from '../reducers/socket'

const updateRoomUsers = (roomName, users) => ({
  type: 'UPDATE_ROOM_USERS',
  key: roomName,
  users: users
})

const updateMessages = (roomName, message) => ({
  type: 'UPDATE_ROOM_MESSAGES',
  key: roomName,
  message: message
})

export const joinRoom = (name) => (dispatch, getState) => {
  const connection = getSocketConnection(getState())
  const room = connection.channel('room:' + name, {})

  room.on('presence_state', (data) => {
    const current = getRoomUsers(getState(), name)
    const users = Presence.syncState(current, data)

    dispatch(updateRoomUsers(name, users))
  })

  room.on('presence_diff', (data) => {
    const current = getRoomUsers(getState(), name)
    const users = Presence.syncDiff(current, data)

    dispatch(updateRoomUsers(name, users))
  })

  room.on('message:new', (data) => (
    dispatch(updateMessages(name, data))
  ))

  room.join()
    // .receive("ok", resp => { console.log("Joined successfully", resp) })
    // .receive("error", resp => { console.log("Unable to join", resp) })

  dispatch({
    type: 'JOIN_ROOM',
    key: name,
    room: room
  })
}

export const createMessage = (roomName, message) => (dispatch, getState) => {
  const room = getRoomInstance(getState(), roomName)

  room.push('message:new', message)
}
