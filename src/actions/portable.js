export const closeChat = () => ({
  type: 'PORTABLE_CLOSE'
})

export const openChat = () => ({
  type: 'PORTABLE_OPEN'
})

export const setActiveRoom = (room) => ({
  type: 'PORTABLE_ACTIVE_ROOM',
  room: room
})
