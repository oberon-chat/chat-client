import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { joinRoom, viewRoom } from '../../actions/rooms'
import { getRoom } from '../../reducers/roomsJoined'
import MessagesList from '../RoomMessages/_List'
import MessageForm from '../RoomMessages/_Form'
import RoomUsers from './_Users'
import { Col, Row } from 'antd'

export class OneRoom extends Component {
  componentDidMount () {
    this.props.onJoin()
  }

  render () {
    const { match } = this.props

    return (
      <div style={{ width: '100%' }}>
        <Link to='/rooms'>All Rooms</Link>
        <h1>Room {match.params.id}</h1>
        <Row>
          <Col span={16}>
            <MessagesList room={match.params.id} />
            <MessageForm room={match.params.id} />
          </Col>
          <Col span={8}>
            <RoomUsers room={match.params.id} />
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
