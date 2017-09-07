import React from 'react'
import Markdown from '../../components/Markdown'
import MessageActions from './_MessageActions'

const Message = ({ currentUser, editing, message, onDelete, renderHeading, room }) => {
  const { body, timestamp, user } = message

  return (
    <div className='message'>
      { renderHeading &&
        <div className='message-heading'>
          <strong>{user}</strong>
          {' '}
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      }
      { editing ? ' (editing)' : ''}
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
