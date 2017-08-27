import { Presence } from 'phoenix'
import { reverse } from 'lodash'
import { receiveMessage, replaceMessages } from './roomMessages'
import { updateRoomUsers } from './roomUsers'
import { getRoomUsers } from '../reducers/roomUsers'
import { withSocketConnection } from '../reducers/socket'

export const joinRoom = (roomName) => (dispatch, getState) => {
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

    return room.join()
      .receive('error', resp => { console.log('Unable to join', resp) })
      .receive('ok', () => {
        dispatch({
          type: 'JOIN_ROOM',
          key: roomName,
          room: room
        })
      })
  })
}
