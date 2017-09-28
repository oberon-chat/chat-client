import React from 'react'

const Content = ({ children, classes }) => (
  <div id='content' className={ classes }>
    { children }
  </div>
)

Content.displayName = 'Content'

export default Content
