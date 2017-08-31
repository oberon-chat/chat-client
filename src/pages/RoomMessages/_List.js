import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { getCurrentUser } from '../../reducers/currentUser'
import { getRoomMessages } from '../../reducers/roomMessages'
import RoomMessage from './_Message'

export const MessageList = ({ currentUser, editingMessageId, messages, room }) => (
  <div>
    { map(messages, (message) => (
      <RoomMessage
        key={message.id}
        editing={editingMessageId === message.id}
        message={message}
        currentUser={currentUser}
        room={room}
      />
    ))}
  </div>
)

MessageList.displayName = 'RoomMessageList'

const mapStateToProps = (state, { room }) => ({
  currentUser: getCurrentUser(state),
  messages: getRoomMessages(state, room)
})

export default connect(mapStateToProps)(MessageList)
