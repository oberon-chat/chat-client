import React from 'react'
import './StatusDot.css'

const StatusDot = ({ color }) => (
  <span className='status-dot' style={{ backgroundColor: color }} />
)

StatusDot.displayName = 'StatusDot'

export default StatusDot
