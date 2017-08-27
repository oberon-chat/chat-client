export const updateRoomUsers = (roomName, users) => ({
  type: 'UPDATE_ROOM_USERS',
  key: roomName,
  users: users
})
