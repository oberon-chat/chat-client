import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { isLoggedIn } from '../../reducers/currentUser'
import ErrorHandler from '../../components/ErrorHandler'
import FlashMessages from '../../components/FlashMessages'
import DraggableBanner from './_DraggableBanner'
import Page from './_Page'
import Main from './_Main'
import Sidebar from './_Sidebar'
import ConnectionError from '../../components/ConnectionError'
import '../../static/antd.css'
import '../../static/common.css'
import '../../static/ui.css'

import Login from '../Login'
import Room from '../Room'

export const Layout = ({ loggedIn }) => {
  const loggedInRoutes = (
    <Switch>
      <Route path={'/rooms/:room/messages/:messageId/edit'} component={Room} />
      <Route path={'/rooms/:room'} component={Room} />
      <Route component={Main} />
    </Switch>
  )

  const loggedOutRoutes = (
    <Switch>
      <Route component={Login} />
    </Switch>
  )

  return (
    <Page>
      <DraggableBanner />
      <FlashMessages />
      <ErrorHandler>
        { loggedIn && <ConnectionError /> }
        { loggedIn && <Sidebar /> }
        { loggedIn ? loggedInRoutes : loggedOutRoutes }
      </ErrorHandler>
    </Page>
  )
}

Layout.displayName = 'Layout'

const mapStateToProps = (state) => ({
  loggedIn: isLoggedIn(state)
})

export default withRouter(connect(mapStateToProps)(Layout))
