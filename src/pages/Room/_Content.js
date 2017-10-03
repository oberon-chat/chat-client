import React from 'react'
import MessagesList from '../Messages/_List'
import EditMessage from '../Messages/_Edit'
import NewMessage from '../Messages/_New'

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
