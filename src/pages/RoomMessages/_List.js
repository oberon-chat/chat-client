import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { getCurrentUser } from '../../reducers/currentUser'
import { getRoomMessages } from '../../reducers/roomMessages'
import { scrollToBottom } from '../../helpers/scroll'
import RoomMessage from './_Message'

class MessageList extends Component {
  componentDidMount () {
    scrollToBottom('.chat-room-content .scroll-container')
    scrollToBottom('.chat-portable .chat-container')
  }

  componentDidUpdate () {
    scrollToBottom('.chat-room-content .scroll-container')
    scrollToBottom('.chat-portable .chat-container')
  }

  render () {
    const { currentUser, editingMessageId, messages, room } = this.props
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
}

const mapStateToProps = (state, { room }) => ({
  currentUser: getCurrentUser(state),
  messages: getRoomMessages(state, room)
})

export default connect(mapStateToProps)(MessageList)
