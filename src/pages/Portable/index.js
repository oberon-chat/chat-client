import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeChat, openChat } from '../../actions/portable'
import { fetchSocket } from '../../actions/socket'
import { getActiveRoom, getIsOpen } from '../../reducers/portable'
import MessagesList from '../RoomMessages/_List'
import MessageForm from './_MessageForm'
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

const Opened = ({ onClose, activeRoom }) => {
  const onClick = (event) => {
    if (event) { event.preventDefault() }

    return onClose()
  }

  return (
    <div className='chat-portable-open'>
      <a onClick={onClick}>Close</a>
      <div className='chat-container scroll-container'>
        { activeRoom ? <MessagesList room={activeRoom} /> : <span>How can we help?</span> }
      </div>
      <div className='chat-form-container'>
        <MessageForm activeRoom={activeRoom} form='portableMessageForm' />
      </div>
    </div>
  )
}

class Portable extends Component {
  componentWillMount () {
    this.props.onLoad()
  }

  render () {
    const { isOpen, onClose, onOpen, activeRoom } = this.props
    const classnames = 'chat-portable ' + (isOpen ? 'open' : 'closed')

    return (
      <div className={classnames}>
        { isOpen ? <Opened onClose={onClose} activeRoom={activeRoom} /> : <Closed onOpen={onOpen} /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isOpen: getIsOpen(state),
  activeRoom: getActiveRoom(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(closeChat()),
  onOpen: () => dispatch(openChat()),
  onLoad: () => dispatch(fetchSocket())
})

export default connect(mapStateToProps, mapDispatchToProps)(Portable)
