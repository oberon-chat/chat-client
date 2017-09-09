import React from 'react'
import { Route, Switch } from 'react-router-dom'

import OneRoom from './One'

export const Rooms = ({ match }) => (
  <Switch>
    <Route path={match.url + '/:roomId/messages/:messageId/edit'} component={OneRoom} />
    <Route path={match.url + '/:roomId'} component={OneRoom} />
  </Switch>
)

Rooms.displayName = 'Rooms'

export default Rooms
