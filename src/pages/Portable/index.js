import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeChat, newChat, openChat } from '../../actions/portable'
import { fetchSocket, socketClose } from '../../actions/socket'
import { getActiveRoom, getHasRecentActivity, getIsOpen } from '../../reducers/portable'
import { shortUuid } from '../../helpers/uuid'
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
    <a onClick={onClick}>Chat</a>
  )
}

const Opened = ({ isActive, onClose, onNew, room }) => {
  const handleClose = (event) => {
    if (event) { event.preventDefault() }

    return onClose()
  }

  const handleNew = (event) => {
    if (event) { event.preventDefault() }

    return onNew()
  }

  return (
    <div className='chat-portable-open'>
      <a onClick={handleClose}>Close</a>
      <a onClick={handleNew}>New Chat</a>
      <div className='chat-container scroll-container'>
        { isActive ? <MessagesList room={room} /> : <span>How can we help?</span> }
      </div>
      <div className='chat-form-container'>
        <MessageForm
          form='portableMessageForm'
          isActive={isActive}
          room={room}
        />
      </div>
    </div>
  )
}

class Portable extends Component {
  componentWillMount () {
    this.props.onLoad()
  }

  render () {
    const { isActive, isClosed, onClose, onNew, onOpen, room } = this.props
    const classnames = 'chat-portable ' + (isClosed ? 'closed' : 'open')

    if (isClosed) {
      return (
        <div className={classnames}>
          <Closed onOpen={onOpen} />
        </div>
      )
    }

    return (
      <div className={classnames}>
        <Opened
          isActive={isActive}
          onClose={onClose}
          onNew={onNew}
          room={room}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const newRoom = 'user-' + shortUuid()
  const isActive = getHasRecentActivity(state)
  const activeRoom = getActiveRoom(state)

  return {
    isActive: isActive,
    isClosed: !getIsOpen(state),
    room: isActive ? activeRoom : newRoom
  }
}

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(closeChat()),
  onLoad: () => dispatch(fetchSocket()),
  onNew: () => {
    const afterFetch = () => dispatch(newChat())
    const afterClose = () => dispatch(fetchSocket(afterFetch))

    dispatch(socketClose(afterClose))
  },
  onOpen: () => dispatch(openChat())
})

export default connect(mapStateToProps, mapDispatchToProps)(Portable)
