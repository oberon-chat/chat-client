import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeChat, openChat } from '../../actions/portable'
import { fetchSocket } from '../../actions/socket'
import { getIsOpen } from '../../reducers/portable'
import NewMessageForm from './NewMessage'
import './index.css'

const Closed = ({ onOpen }) => {
  const onClick = (event) => {
    if (event) { event.preventDefault() }

    return onOpen()
  }

  return (
    <a onClick={onClick}>Start Chat</a>
  )
}

const Opened = ({ onClose }) => {
  const onClick = (event) => {
    if (event) { event.preventDefault() }

    return onClose()
  }

  return (
    <div>
      <a onClick={onClick}>Close</a>
      Opened Chat
      <NewMessageForm form='portableMessageForm' />
    </div>
  )
}

class Portable extends Component {
  componentWillMount () {
    this.props.onLoad()
  }

  render () {
    const { isOpen, onClose, onOpen } = this.props

    return (
      <div className='chat-portable'>
        { isOpen ? <Opened onClose={onClose} /> : <Closed onOpen={onOpen} /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isOpen: getIsOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(closeChat()),
  onOpen: () => dispatch(openChat()),
  onLoad: () => dispatch(fetchSocket())
})

export default connect(mapStateToProps, mapDispatchToProps)(Portable)
