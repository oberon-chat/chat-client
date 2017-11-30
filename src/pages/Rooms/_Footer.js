import React from 'react'
import { connect } from 'react-redux'
import { createSubscription } from '../../actions/userSubscriptions'
import { getRoom } from '../../reducers/rooms'
import { getIsSubscribed } from '../../reducers/userSubscriptions'
import EditMessage from '../Messages/_Edit'
import NewMessage from '../Messages/_New'
import { Button } from 'antd'

const RoomFooter = ({ isArchived, isSubscribed, joinRoom, messageId, room }) => {
  const joinFooter = (
    <div className='chat-join-mesage-footer'>
      Viewing Room <strong>{room}</strong>
      {' '}
      <Button onClick={joinRoom}>Join</Button>
    </div>
  )

  const messageFooter = messageId
    ? <EditMessage key={room} messageId={messageId} room={room} />
    : <NewMessage key={room} room={room} />

  const activeFooter = (
    <div className='chat-room-content-footer'>
      { isSubscribed ? messageFooter : joinFooter }
    </div>
  )

  const archivedFooter = (
    <div className='chat-room-content-footer'>
      Viewing Archived Room <strong>{room}</strong>
      {' '}
    </div>
  )

  return (
    isArchived ? archivedFooter : activeFooter
  )
}

RoomFooter.displayName = 'RoomFooter'

const mapStateToProps = (state, { room: slug }) => {
  const isSubscribed = getIsSubscribed(state, slug)
  const room = getRoom(state, slug)

  return {
    isArchived: room.state === 'archived',
    isSubscribed: isSubscribed
  }
}

const mapDispatchToProps = (dispatch, { room }) => ({
  joinRoom: () => dispatch(createSubscription(room))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomFooter)
