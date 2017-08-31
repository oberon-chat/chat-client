import React from 'react'
import Markdown from '../../components/Markdown'
import MessageActions from './_MessageActions'

const Message = ({ currentUser, editing, message, onDelete, room }) => {
  const { body, timestamp, user } = message

  return (
    <div className='message'>
      <strong>{user}</strong>
      {' '}
      {new Date(timestamp).toLocaleTimeString()}
      { editing ? ' (editing)' : ''}
      <br />
      <Markdown value={body} />
      <MessageActions
        currentUser={currentUser}
        message={message}
        room={room}
      />
    </div>
  )
}

Message.displayName = 'RoomMessage'

export default Message
