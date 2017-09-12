import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { joinRoom, viewRoom } from '../../actions/rooms'
import notification from '../../helpers/notification'
import Main from './_Main'
import Sidebar from './_Sidebar'

class Room extends Component {
  componentDidMount () {
    this.props.onJoin(this.props.room)
  }

  componentWillReceiveProps (next) {
    if (this.props.room !== next.room) {
      this.props.onJoin(next.room)
    }
  }

  render () {
    const { messageId, room } = this.props

    return (
      <div className='chat-room'>
        <Main messageId={messageId} room={room} />
        <Sidebar room={room} />
      </div>
    )
  }
}

const mapStateToProps = (_state, { match }) => ({
  messageId: match.params.messageId,
  room: match.params.room
})

const mapDispatchToProps = (dispatch, { match }) => ({
  onJoin: (room) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Room)
