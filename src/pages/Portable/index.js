import React from 'react'
import { connect } from 'react-redux'
import { closeChat, openChat } from '../../actions/portable'
import { getIsOpen } from '../../reducers/portable'
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
    </div>
  )
}

export const Portable = ({ isOpen, onClose, onOpen }) => {
  return (
    <div className='chat-portable'>
      { isOpen ? <Opened onClose={onClose} /> : <Closed onOpen={onOpen} /> }
    </div>
  )
}

Portable.displayName = 'Portable'

const mapStateToProps = (state) => ({
  isOpen: getIsOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  onOpen: () => dispatch(openChat()),
  onClose: () => dispatch(closeChat())
})

export default connect(mapStateToProps, mapDispatchToProps)(Portable)
