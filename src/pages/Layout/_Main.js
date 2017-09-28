import React from 'react'

const Main = ({ children, classes }) => (
  <div id='main' className={'window-height ' + classes}>
    { children }
  </div>
)

Main.displayName = 'Main'

export default Main
