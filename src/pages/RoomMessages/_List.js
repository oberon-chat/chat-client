import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { getRoomMessages } from '../../reducers/roomMessages'
import Markdown from '../../components/Markdown'
import { Card } from 'antd'

export const MessageList = ({ messages }) => (
  <div>
    { map(messages, (message) => (
      <Card key={message.id} style={{ marginTop: '15px' }}>
        <strong>{message.user}</strong>
        {' '}
        {new Date(message.timestamp).toLocaleTimeString()}
        <br />
        <Markdown value={message.body} />
      </Card>
    ))}
  </div>
)

MessageList.displayName = 'RoomMessageList'

const mapStateToProps = (state, { room }) => ({
  messages: getRoomMessages(state, room)
})

export default connect(mapStateToProps)(MessageList)
