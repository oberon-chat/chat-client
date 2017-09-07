export const closeChat = () => ({
  type: 'PORTABLE_CLOSE'
})

export const openChat = () => ({
  type: 'PORTABLE_OPEN'
})

export const activeRoom = (room) => ({
  type: 'PORTABLE_ACTIVE_ROOM',
  room: room
})
