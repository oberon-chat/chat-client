import React from 'react'
import Section from '../../components/Section'
import MessagesList from '../RoomMessages/_List'
import EditMessage from '../RoomMessages/_Edit'
import NewMessage from '../RoomMessages/_New'

const RoomMain = ({ messageId, room }) => {
  const header = (
    <div>
      <h1>Room {room}</h1>
    </div>
  )

  const footer = messageId
    ? <EditMessage messageId={messageId} room={room} />
    : <NewMessage room={room} />

  return (
    <Section header={header} footer={footer}>
      <MessagesList editingMessageId={messageId} room={room} />
    </Section>
  )
}

export default RoomMain
