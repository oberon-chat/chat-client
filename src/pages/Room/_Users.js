import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { getRoomUsers } from '../../reducers/roomUsers'
import StatusDot from '../../components/StatusDot'

export const RoomUsers = ({ users }) => (
  <div className='scroll-container'>
    <h3>Users</h3>
    <ul>
      { map(users, (_metas, name) => (
        <li key={name}>
          <StatusDot color='#6ad439' />
          {name}
        </li>
      ))}
    </ul>
  </div>
)

RoomUsers.displayName = 'RoomUsers'

const mapStateToProps = (state, { room }) => ({
  users: getRoomUsers(state, room)
})

export default connect(mapStateToProps)(RoomUsers)
