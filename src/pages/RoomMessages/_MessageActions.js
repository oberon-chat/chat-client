import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteMessage } from '../../actions/roomMessages'
import { editMessagePath } from '../../helpers/paths'
import { Button, Modal } from 'antd'

const Actions = ({ currentUser, message, onDelete, room }) => {
  const { body, id, user } = message

  const OwnerActions = () => {
    if (currentUser.username !== user) {
      return null
    }

    const onConfirm = (event) => {
      if (event) { event.preventDefault() }

      Modal.confirm({
        cancelText: 'Cancel',
        content: body,
        okText: 'Delete',
        onCancel: () => false,
        onOk: () => {
          onDelete(id)
          return false
        },
        title: 'Do you want to delete message?'
      })
    }

    return (
      <span>
        <Button onClick={onConfirm}>
          Delete
        </Button>
        <Link to={editMessagePath(room, id)}>
          Edit
        </Link>
      </span>
    )
  }

  return (
    <div className='actions'>
      <OwnerActions />
    </div>
  )
}

Actions.displayName = 'MessageActions'

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch, { room }) => ({
  onDelete: (id) => dispatch(deleteMessage(room, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
