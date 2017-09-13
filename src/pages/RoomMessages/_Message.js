import React from 'react'
import Markdown from '../../components/Markdown'
import MessageActions from './_MessageActions'
import moment from 'moment'
import { Icon, Tooltip } from 'antd'

const Message = ({ currentUser, editing, message, onDelete, renderHeading, room }) => {
  const { body, timestamp, user } = message

  return (
    <div className='message'>
      { renderHeading &&
        <div className='message-heading'>
          <strong>{user}</strong>
          {' '}
          <Tooltip placement='top' title={moment(timestamp).calendar()}>
            { moment(timestamp).format('h:mm A') }
          </Tooltip>
        </div>
      }
      <Markdown value={body} />
      <MessageActions
        currentUser={currentUser}
        message={message}
        room={room}
      />
      { editing &&
        <Icon type='edit' />
      }
    </div>
  )
}

Message.displayName = 'RoomMessage'

export default Message
