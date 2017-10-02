import React from 'react'
import { connect } from 'react-redux'
import { isConnected } from '../reducers/socket'

const ConnectionError = ({ connected }) => {
  if (connected) {
    return null
  }

  return (
    <div className='chat-overlay'>
      <div className='connection-error'>
        Reconnecting...
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  connected: isConnected(state)
})

ConnectionError.displayName = 'ConnectionError'

export default connect(mapStateToProps)(ConnectionError)
