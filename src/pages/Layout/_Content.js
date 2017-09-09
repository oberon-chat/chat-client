import React from 'react'

const Content = ({ children }) => (
  <div id='content' className='window-height'>
    { children }
  </div>
)

Content.displayName = 'Content'

export default Content
