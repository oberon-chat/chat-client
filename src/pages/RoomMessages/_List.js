import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { map } from 'lodash'
import { getRoomMessages } from '../../reducers/roomMessages'
import Markdown from '../../components/Markdown'
import { editMessagePath } from '../../helpers/paths'
import { Card } from 'antd'

export const MessageList = ({ messages, room }) => (
  <div>
    { map(messages, (message) => (
      <Card key={message.id} style={{ marginTop: '15px' }}>
        <strong>{message.user}</strong>
        {' '}
        {new Date(message.timestamp).toLocaleTimeString()}
        <br />
        <Markdown value={message.body} />
        <br />
        <Link to={editMessagePath(room, message.id)}>
          Edit
        </Link>
      </Card>
    ))}
  </div>
)

MessageList.displayName = 'RoomMessageList'

const mapStateToProps = (state, { room }) => ({
  messages: getRoomMessages(state, room)
})

export default connect(mapStateToProps)(MessageList)
