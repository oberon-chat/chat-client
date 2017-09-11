import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeChat, openChat } from '../../actions/portable'
import { fetchSocket } from '../../actions/socket'
import { getActiveRoom, getIsOpen } from '../../reducers/portable'
import MessagesList from '../RoomMessages/_List'
import NewMessageForm from './NewMessage'
import '../../static/antd-portable.css'
import '../../static/common.css'
import '../../static/portable.css'

const Closed = ({ onOpen }) => {
  const onClick = (event) => {
    if (event) { event.preventDefault() }

    return onOpen()
  }

  return (
    <a onClick={onClick}>Start Chat</a>
  )
}

const Opened = ({ onClose, room }) => {
  const onClick = (event) => {
    if (event) { event.preventDefault() }

    return onClose()
  }

  return (
    <div>
      <a onClick={onClick}>Close</a>
      { room ? <MessagesList room={room} /> : <span>How can we help?</span> }
      <NewMessageForm form='portableMessageForm' />
    </div>
  )
}

class Portable extends Component {
  componentWillMount () {
    this.props.onLoad()
  }

  render () {
    const { isOpen, onClose, onOpen, room } = this.props

    return (
      <div className='chat-portable'>
        { isOpen ? <Opened onClose={onClose} room={room} /> : <Closed onOpen={onOpen} /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isOpen: getIsOpen(state),
  room: getActiveRoom(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(closeChat()),
  onOpen: () => dispatch(openChat()),
  onLoad: () => dispatch(fetchSocket())
})

export default connect(mapStateToProps, mapDispatchToProps)(Portable)
