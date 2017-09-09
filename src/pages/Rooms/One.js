import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { joinRoom, viewRoom } from '../../actions/rooms'
import notification from '../../helpers/notification'
import Section from '../../components/Section'
import MessagesList from '../RoomMessages/_List'
import EditMessage from '../RoomMessages/_Edit'
import NewMessage from '../RoomMessages/_New'
import RoomUsers from './_Users'

export class OneRoom extends Component {
  componentDidMount () {
    this.props.onJoin()
  }

  render () {
    const { match } = this.props
    const { messageId, roomId } = match.params

    const header = (
      <div>
        <h1>Room {roomId}</h1>
      </div>
    )

    const footer = (
      <div>
        { messageId
          ? <EditMessage messageId={messageId} room={roomId} />
          : <NewMessage room={roomId} />
        }
      </div>
    )

    return (
      <Section header={header} footer={footer}>
        <MessagesList editingMessageId={messageId} room={roomId} />
        <RoomUsers room={roomId} />
      </Section>
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
