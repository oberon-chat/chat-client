import React from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { archiveRoom, leaveRoomChannel, reactivateRoom } from '../../actions/rooms'
import { deleteSubscription } from '../../actions/userSubscriptions'
import notification from '../../helpers/notification'
import { rootPath } from '../../helpers/paths'
import { Menu, Dropdown, Button, Modal } from 'antd'

const RoomHeaderActions = ({ handleLeave, handleArchive, handleReactivate, isArchived, isSubscribed, isDirectMessage, room }) => {
  if (!isSubscribed || isDirectMessage) {
    return null
  }

  const onArchiveConfirm = (event) => {
    if (event) { event.preventDefault() }

    Modal.confirm({
      cancelText: 'Cancel',
      content: 'Archiving a room will disable all users from posting new messages and prevent new users from joining ' + room,
      okText: 'Archive',
      onCancel: () => false,
      onOk: () => {
        handleArchive()
        return false
      },
      title: 'Do you want to archive room: ' + room + '?'
    })
  }

  const onReactivateConfirm = (event) => {
    if (event) { event.preventDefault() }

    Modal.confirm({
      cancelText: 'Cancel',
      content: 'This will reopen this room for all subscribed users and allow new users to join ' + room,
      okText: 'Reactivate',
      onCancel: () => false,
      onOk: () => {
        handleReactivate()
        return false
      },
      title: 'Do you want to reactivate room: ' + room + '?'
    })
  }

  const roomSettings = (
    <Menu>
      { isSubscribed && !isDirectMessage &&
      <Menu.Item>
        <button onClick={handleLeave}>Leave Room</button>
      </Menu.Item>
      }
      { isSubscribed && !isDirectMessage && !isArchived &&
      <Menu.Item>
        <button onClick={onArchiveConfirm}>Archive Room</button>
      </Menu.Item>
      }
      { isSubscribed && !isDirectMessage && isArchived &&
      <Menu.Item>
        <button onClick={onReactivateConfirm}>Reactivate Room</button>
      </Menu.Item>
      }
    </Menu>
  )

  return (
    <div className='chat-room-header-actions'>
      <Dropdown overlay={roomSettings} placement='bottomRight'>
        <Button className='anchor' icon='setting' />
      </Dropdown>
    </div>
  )
}

RoomHeaderActions.displayName = 'RoomHeaderActions'

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch, { room: slug }) => ({
  handleLeave: () => {
    const onSuccess = () => {
      dispatch(leaveRoomChannel(slug))
      notification('Left room ' + slug, 'success')
      history.push(rootPath)
    }
    const onError = () => {
      notification('Error leaving room ' + slug, 'error')
    }
    return dispatch(deleteSubscription(slug, onSuccess, onError))
  },
  handleArchive: () => {
    return dispatch(archiveRoom(slug))
  },
  handleReactivate: () => {
    return dispatch(reactivateRoom(slug))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomHeaderActions)
