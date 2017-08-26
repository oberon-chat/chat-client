import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinRoom } from '../../actions/rooms'
import { getRoom } from '../../reducers/rooms'
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
        <h1>room {match.params.id}</h1>
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
  onJoin: () => dispatch(joinRoom(match.params.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OneRoom)
