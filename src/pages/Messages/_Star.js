import React from 'react'
import { connect } from 'react-redux'
import { deleteStar, starMessage, submitStar, unstarMessage } from '../../actions/starMessage'
import Tooltip from '../../components/Tooltip'
import { Button } from 'antd'

const Star = ({currentUser, isStarred, toggleStar}) => {
  const classes = 'star-message ' + (isStarred ? 'starred' : 'unstarred')
  const handleStarClick = (event) => {
    if (event) { event.preventDefault() }
    toggleStar()
  }

  return (
    <Tooltip placement='top' title='Star Message'>
      <Button
        className={classes}
        icon={isStarred ? 'star' : 'star-o'}
        onClick={handleStarClick}
      />
    </Tooltip>
  )
}

Star.displayName = 'Star'

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch, {isStarred, messageId}) => ({
  toggleStar: () => {
    const unstar = () => {
      const onSuccess = () => dispatch(unstarMessage(messageId))

      return dispatch(deleteStar(messageId, onSuccess))
    }
    const star = () => {
      const onSuccess = () => dispatch(starMessage(messageId))

      return dispatch(submitStar(messageId, onSuccess))
    }

    return isStarred ? unstar() : star()
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Star)
