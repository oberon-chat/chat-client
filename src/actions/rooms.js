import { Presence } from "phoenix"
import { getRoomUsers } from "../reducers/rooms"
import { getSocketConnection } from "../reducers/socket"

const updateRoomUsers = (name, users) => ({
  type: 'UPDATE_ROOM_USERS',
  key: name,
  users: users
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

  room.join()
    // .receive("ok", resp => { console.log("Joined successfully", resp) })
    // .receive("error", resp => { console.log("Unable to join", resp) })

  dispatch({
    type: "JOIN_ROOM",
    key: name,
    room: room
  })
}
