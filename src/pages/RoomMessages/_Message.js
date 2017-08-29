import React from 'react'
import { Link } from 'react-router-dom'
import Markdown from '../../components/Markdown'
import { editMessagePath } from '../../helpers/paths'
import { Card } from 'antd'

const Message = ({ message, props }) => {
  const { id, body, timestamp, user } = message
  const { currentUser, room } = props

  const EditButton = () => {
    if (currentUser.username !== user) { return null }

    return (
      <Link to={editMessagePath(room, id)}>
        Edit
      </Link>
    )
  }

  return (
    <Card style={{ marginTop: '15px' }}>
      <strong>{user}</strong>
      {' '}
      {new Date(timestamp).toLocaleTimeString()}
      <br />
      <Markdown value={body} />
      <EditButton />
    </Card>
  )
}

Message.displayName = 'RoomMessage'

export default Message
