import React from 'react'
import RoomUsers from './_Users'

const RoomSidebar = ({ room }) => (
  <div className='chat-room-sidebar'>
    <RoomUsers room={room} />
  </div>
)

RoomSidebar.displayName = 'RoomSidebar'

export default RoomSidebar
