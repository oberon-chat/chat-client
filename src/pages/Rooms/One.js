import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { joinRoom, viewRoom } from '../../actions/rooms'
import { getRoom } from '../../reducers/roomsJoined'
import MessagesList from '../RoomMessages/_List'
import EditMessage from '../RoomMessages/_Edit'
import NewMessage from '../RoomMessages/_New'
import RoomUsers from './_Users'
import { Col, Row } from 'antd'

export class OneRoom extends Component {
  componentDidMount () {
    this.props.onJoin()
  }

  render () {
    const { match } = this.props
    const roomName = match.params.id

    return (
      <div style={{ width: '100%' }}>
        <Link to='/rooms'>All Rooms</Link>
        <h1>Room {roomName}</h1>
        <Row>
          <Col span={16}>
            <MessagesList room={roomName} />
            <Switch>
              <Route path={'/rooms/:room/messages/:message/edit'} component={EditMessage} />
              <Route path={'/rooms/:room'} component={NewMessage} />
            </Switch>
          </Col>
          <Col span={8}>
            <RoomUsers room={roomName} />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  room: getRoom(state, match.params.id)
})

const mapDispatchToProps = (dispatch, { match }) => ({
  onJoin: () => {
    dispatch(joinRoom(match.params.id))
    dispatch(viewRoom(match.params.id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OneRoom)
