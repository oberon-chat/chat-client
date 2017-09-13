import React from 'react'
import Markdown from '../../components/Markdown'
import MessageActions from './_MessageActions'
import moment from 'moment'
import { Avatar, Icon, Tooltip } from 'antd'

const Message = ({ currentUser, editing, message, onDelete, renderHeading, room }) => {
  const { body, timestamp, user } = message

  return (
    <div className='message'>
      <div className='message-gutter'>
        { renderHeading &&
          <Avatar shape='square' icon='bulb' style={{ backgroundColor: '#52b3f9' }} />
        }
        { !renderHeading &&
          <div>
            <div className='hover-timestamp'>
              { moment(timestamp).format('h:mm') }
            </div>
            { editing && <Icon type='edit' /> }
          </div>
        }
      </div>
      <div className='message-content'>
        { renderHeading &&
          <div className='message-heading'>
            { editing && <Icon type='edit' /> }
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
      </div>
    </div>
  )
}

Message.displayName = 'RoomMessage'

export default Message
