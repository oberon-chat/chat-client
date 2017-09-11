import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { joinRoom, viewRoom } from '../../actions/rooms'
import notification from '../../helpers/notification'
import Main from './_Main'
import Sidebar from './_Sidebar'

class Room extends Component {
  componentDidMount () {
    this.props.onJoin()
  }

  render () {
    const { match } = this.props
    const { messageId, room } = match.params

    return (
      <div>
        <Main messageId={messageId} room={room} />
        <Sidebar room={room} />
      </div>
    )
  }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch, { match }) => ({
  onJoin: () => {
    const { room } = match.params

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
