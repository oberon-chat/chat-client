import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import moment from 'moment'
import { getCurrentUser } from '../../reducers/currentUser'
import { getRoomMessages } from '../../reducers/roomMessages'
import { getIsStarred } from '../../reducers/starMessages'
import { scrollToBottom } from '../../helpers/scroll'
import Message from './_One'

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
    const { currentUser, editingMessageId, messages, room, isStarred } = this.props
    let messageUser = {}
    let messageStart

    const renderMessage = (message) => {
      const { insertedAt, user } = message
      const timestamp = moment(insertedAt).unix()
      const limit = 60 * 5

      if (!messageStart) {
        messageStart = timestamp
      }

      let renderHeading = false

      if (user.id !== messageUser.id) {
        renderHeading = true
        messageUser = user
      } else if (timestamp - messageStart > limit) {
        renderHeading = true
        messageStart = timestamp
      }

      return (
        <Message
          key={message.id}
          isStarred={isStarred(message)}
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
  messages: getRoomMessages(state, room),
  isStarred: (message) => getIsStarred(state, message.id)
})

export default connect(mapStateToProps)(MessageList)
