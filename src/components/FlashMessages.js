import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { getOpenFlashMessages } from '../reducers/flashMessages'
import FlashMessage from './FlashMessage'

const FlashMessages = ({messages}) => (
  <div className='flash-messages'>
    {map(messages, (message) => (
      <FlashMessage key={message.id} message={message} />
    ))}
  </div>
)

FlashMessages.displayName = 'FlashMessages'

const mapStateToProps = (state) => ({
  messages: getOpenFlashMessages(state)
})

export default connect(mapStateToProps)(FlashMessages)
