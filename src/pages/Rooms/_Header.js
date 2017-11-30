import React from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../reducers/currentUser'
import { getRoom } from '../../reducers/rooms'
import { getDirectMessageUser } from '../../reducers/roomSubscriptions'
import { getIsSubscribed } from '../../reducers/userSubscriptions'
import Header from '../Layout/_Header'
import RoomHeaderActions from './_HeaderActions'

const RoomHeader = ({ heading, isDirectMessage, isSubscribed, isArchived, room }) => (
  <Header>
    <h2>{ heading }</h2>
    <RoomHeaderActions
      room={room}
      isSubscribed={isSubscribed}
      isDirectMessage={isDirectMessage}
      isArchived={isArchived}
    />
  </Header>
)
RoomHeader.displayName = 'RoomHeader'

const mapStateToProps = (state, { room: slug }) => {
  const currentUser = getCurrentUser(state)
  const room = getRoom(state, slug)
  const isDirectMessage = room.type === 'direct'
  const heading = isDirectMessage ? getDirectMessageUser(state, slug, currentUser).name : (room.name || slug)

  return {
    heading: heading,
    isDirectMessage: isDirectMessage,
    isSubscribed: getIsSubscribed(state, slug),
    isArchived: room.state === 'archived'
  }
}

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RoomHeader)
