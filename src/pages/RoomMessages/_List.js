import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { getCurrentUser } from '../../reducers/currentUser'
import { getRoomMessages } from '../../reducers/roomMessages'
import RoomMessage from './_Message'

export const MessageList = (props) => (
  <div>
    { map(props.messages, (message) => (
      <RoomMessage key={message.id} message={message} props={props} />
    ))}
  </div>
)

MessageList.displayName = 'RoomMessageList'

const mapStateToProps = (state, { room }) => ({
  currentUser: getCurrentUser(state),
  messages: getRoomMessages(state, room)
})

export default connect(mapStateToProps)(MessageList)
