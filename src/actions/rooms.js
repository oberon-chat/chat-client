import { Socket } from "phoenix"
import { getSocket } from "../reducers/socket"

const updateRoomUsers = (name, users) => {
  type: 'UPDATE_ROOM_USERS',
  key: name,
  users: users
}

export const joinRoom = (name = 'room:lobby') => (dispatch, getState) => {
  const socket = getSocket(getState())
	const room = socket.channel(name, {})

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
