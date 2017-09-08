import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { isLoggedIn } from '../reducers/currentUser'
import Header from './Layout/_Header'
import DraggableBanner from './Layout/_DraggableBanner'
import FlashMessages from '../components/FlashMessages'
import Page from './Layout/_Page'
import '../static/antd.css'
import '../static/common.css'
import '../static/ui.css'

import Login from './Login'
import Rooms from './Rooms'

export const Layout = ({ loggedIn }) => {
  const loggedInRoutes = (
    <Switch>
      <Route path='/rooms' component={Rooms} />
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
      <Header />
      <div id='content' className='padded'>
        { loggedIn ? loggedInRoutes : loggedOutRoutes }
      </div>
    </Page>
  )
}

Layout.displayName = 'Layout'

const mapStateToProps = (state) => ({
  loggedIn: isLoggedIn(state)
})

export default withRouter(connect(mapStateToProps)(Layout))
