import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import history from '../../app/history'
import { joinRoom, viewRoom } from '../../actions/rooms'
import notification from '../../helpers/notification'
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
    const { messageId, roomId } = match.params

    return (
      <div style={{ width: '100%' }}>
        <Link to='/rooms'>All Rooms</Link>
        <h1>Room {roomId}</h1>
        <Row>
          <Col span={16}>
            <MessagesList room={roomId} />
            { messageId
              ? <EditMessage messageId={messageId} room={roomId} />
              : <NewMessage room={roomId}/>
            }
          </Col>
          <Col span={8}>
            <RoomUsers room={roomId} />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => ({

})

const mapDispatchToProps = (dispatch, { match }) => ({
  onJoin: () => {
    const room = match.params.roomId

    const onSuccess = () => {
      dispatch(viewRoom(room))
    }

    const onError = () => {
      notification('Error joining room ' + room, 'error')
      history.push('/rooms')
    }

    dispatch(joinRoom(room, onSuccess, onError))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OneRoom)
