import { Socket } from "phoenix"
import { getSocket } from "../reducers/socket"
import { getCurrentUser } from "../reducers/currentUser"

export const socketOpen = () => ({
  type: "SOCKET_OPEN"
})

export const socketClose = () => ({
  type: "SOCKET_CLOSE"
})

export const socketError = (message) => ({
  type: "SOCKET_ERROR",
  key: "socket",
  error: {reason: message}
})

export const fetchSocket = (callback) => (dispatch, getState) => {
  const state = getState()
  const socket = getSocket(state)
  const user = getCurrentUser(state)
  const initialized = socket && socket.connection

  if (!initialized && socket.url) {
    // const url = socket.url
    // const token = user.token
    // const connection = new Socket(url, {params: {token: token}})

    const connection = new Socket(socket.url, {user: user.username})

    connection.onOpen(() => dispatch(socketOpen()))
    connection.onClose(() => dispatch(socketClose()))
    connection.onError((message) => dispatch(socketError(message)))
    connection.connect()

    dispatch({type: "SOCKET_NEW", connection})
  }

  if (callback) {
    dispatch(callback())
  }
}
