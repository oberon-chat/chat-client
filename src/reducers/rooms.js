import { isEmpty } from 'lodash'
import { getChannel } from './channels'
import { getPublicRoom } from './publicRooms'
import { getSupportRoom } from './supportRooms'
import { getSubscribedRoom } from './userSubscriptions'

export const getRoom = (state, key) => {
  const getters = [
    getSubscribedRoom,
    getPublicRoom,
    getSupportRoom
  ]

  for (let i = 0; i < getters.length; i++) {
    const room = getSubscribedRoom(state, key)

    if (!isEmpty(room)) {
      return room
    }
  }

  return {}
}
export const getRoomsChannel = (state) => getChannel(state, 'rooms')
export const getRoomChannel = (state, key) => getChannel(state, 'room:' + key)
