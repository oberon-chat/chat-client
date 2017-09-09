import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { getCurrentUser } from '../../reducers/currentUser'
import { getRoomMessages } from '../../reducers/roomMessages'
import RoomMessage from './_Message'

export const MessageList = ({ currentUser, editingMessageId, messages, room }) => {
  let messageStart = 0
  let messageUser

  const renderMessage = (message) => {
    const { timestamp, user } = message
    const limit = 60 * 60 * 5

    let renderHeading = false

    if (user !== messageUser) {
      renderHeading = true
      messageUser = user
      messageStart = timestamp
    } else if (timestamp - messageStart > limit) {
      renderHeading = true
      messageStart = timestamp
    }

    return (
      <RoomMessage
        key={message.id}
        editing={editingMessageId === message.id}
        message={message}
        currentUser={currentUser}
        renderHeading={renderHeading}
        room={room}
      />
    )
  }

  return (
    <div className='message-list'>
      { map(messages, renderMessage) }
    </div>
  )
}

MessageList.displayName = 'RoomMessageList'

const mapStateToProps = (state, { room }) => ({
  currentUser: getCurrentUser(state),
  messages: getRoomMessages(state, room)
})

export default connect(mapStateToProps)(MessageList)
