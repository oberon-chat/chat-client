import { Presence } from 'phoenix'
import { isEmpty, reverse } from 'lodash'
import { receiveMessage, removeMessage, replaceMessage, replaceMessages } from './roomMessages'
import { updateRoomUsers } from './roomUsers'
import { getRooms, getRoomsChannel } from '../reducers/rooms'
import { getRoomChannel } from '../reducers/roomsJoined'
import { getRoomUsers } from '../reducers/roomUsers'
import { withSocketConnection } from '../reducers/socket'

export const createRoom = (roomName) => (dispatch, getState) => {
  const rooms = getRoomsChannel(getState())

  return rooms.push('rooms:new', roomName)
}

export const viewRoom = (roomName) => ({
  type: 'VIEW_ROOM',
  room: roomName
})

const updateRooms = (rooms) => ({
  type: 'UPDATE_ROOMS',
  rooms: rooms
})

export const joinRooms = () => (dispatch, getState) => {
  const rooms = getRoomsChannel(getState())

  if (!isEmpty(rooms)) {
    return rooms
  }

  withSocketConnection(getState, (connection) => {
    const rooms = connection.channel('rooms', {})

    rooms.on('presence_state', (data) => {
      const current = getRooms(getState())
      const updated = Presence.syncState(current, data)

      dispatch(updateRooms(updated))
    })

    rooms.on('presence_diff', (data) => {
      const current = getRooms(getState())
      const updated = Presence.syncDiff(current, data)

      dispatch(updateRooms(updated))
    })

    return rooms.join()
      .receive('error', resp => { console.log('Unable to join', resp) })
      .receive('ok', () => {
        dispatch({
          type: 'JOIN_ROOMS',
          channel: rooms
        })
      })
  })
}

export const joinRoom = (roomName, onSuccess, onError) => (dispatch, getState) => {
  const room = getRoomChannel(getState(), roomName)

  if (!isEmpty(room)) {
    if (onSuccess) {
      onSuccess()
    }

    return room
  }

  withSocketConnection(getState, (connection) => {
    const room = connection.channel('room:' + roomName, {})

    room.on('presence_state', (data) => {
      const current = getRoomUsers(getState(), roomName)
      const users = Presence.syncState(current, data)

      dispatch(updateRoomUsers(roomName, users))
    })

    room.on('presence_diff', (data) => {
      const current = getRoomUsers(getState(), roomName)
      const users = Presence.syncDiff(current, data)

      dispatch(updateRoomUsers(roomName, users))
    })

    room.on('message_state', (data) => {
      const messages = (data || {}).messages

      dispatch(replaceMessages(roomName, reverse(messages)))
    })

    room.on('message:new', (data) => (
      dispatch(receiveMessage(roomName, data))
    ))

    room.on('message:update', (data) => (
      dispatch(replaceMessage(roomName, data))
    ))

    room.on('message:delete', (data) => (
      dispatch(removeMessage(roomName, data))
    ))

    const onJoinSuccess = () => {
      if (onSuccess) { onSuccess() }

      dispatch({
        type: 'JOIN_ROOM',
        key: roomName,
        channel: room
      })
    }

    const onJoinError = (error) => {
      if (onError) { onError(error) }
    }

    return room.join()
      .receive('ok', onJoinSuccess)
      .receive('error', onJoinError)
  })
}
