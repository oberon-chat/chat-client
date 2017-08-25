import React from 'react'

export const OneRoom = ({ match }) => (
  <span>room {match.params.id}</span>
)

OneRoom.displayName = 'OneRoom'

export default OneRoom
