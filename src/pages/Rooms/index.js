import React from 'react'
import { Route, Switch } from 'react-router-dom'

import OneRoom from './One'
import AllRooms from './All'

export const Rooms = ({ match }) => (
  <Switch>
    <Route path={match.url + '/:roomId/messages/:messageId/edit'} component={OneRoom} />
    <Route path={match.url + '/:roomId'} component={OneRoom} />
    <Route component={AllRooms} />
  </Switch>
)

Rooms.displayName = 'Rooms'

export default Rooms
