import { Presence } from 'phoenix'
import { receiveMessage } from './roomMessages'
import { getRoomUsers } from '../reducers/rooms'
import { withSocketConnection } from '../reducers/socket'

const updateRoomUsers = (roomName, users) => ({
  type: 'UPDATE_ROOM_USERS',
  key: roomName,
  users: users
})

export const joinRoom = (name) => (dispatch, getState) => {
  withSocketConnection(getState, (connection) => {
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
      dispatch(receiveMessage(name, data))
    ))

    return room.join()
      .receive('error', resp => { console.log('Unable to join', resp) })
      .receive('ok', () => {
        dispatch({
          type: 'JOIN_ROOM',
          key: name,
          room: room
        })
      })
  })
}
