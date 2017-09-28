import React from 'react'
import MessagesList from '../RoomMessages/_List'
import EditMessage from '../RoomMessages/_Edit'
import NewMessage from '../RoomMessages/_New'

const RoomContent = ({ messageId, room }) => {
  const footer = messageId
    ? <EditMessage key={room} messageId={messageId} room={room} />
    : <NewMessage key={room} room={room} />

  return (
    <div className='chat-room-content'>
      <div className='scroll-container'>
        <MessagesList editingMessageId={messageId} room={room} />
      </div>
      <div className='chat-room-content-footer'>
        { footer }
      </div>
    </div>
  )
}

export default RoomContent
