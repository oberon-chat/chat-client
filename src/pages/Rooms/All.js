import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { map } from 'lodash'
import { joinRooms } from '../../actions/rooms'
import { getRooms } from '../../reducers/rooms'
import { getRoomsJoined } from '../../reducers/roomsJoined'
import CreateRoomForm from './_Form'

export class AllRooms extends Component {
  componentDidMount () {
    this.props.onJoin()
  }

  render () {
    const { match, rooms, roomsJoined } = this.props

    return (
      <div>
        <h1>Rooms</h1>
        <ul>
          { map(rooms, (_, name) => (
            <li key={name}>
              <Link to={match.url + '/' + name}>
                {name}
              </Link>
            </li>
          )) }
        </ul>
        <h3>Create Room</h3>
        <CreateRoomForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rooms: getRooms(state),
  roomsJoined: getRoomsJoined(state)
})

const mapDispatchToProps = (dispatch) => ({
  onJoin: () => dispatch(joinRooms())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRooms)
