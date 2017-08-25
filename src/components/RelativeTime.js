import React from 'react'
import moment from 'moment'
import { Tooltip } from 'antd'

const RelativeTime = ({ time }) => (
  <Tooltip placement='bottom' title={moment(time + 'Z').format()}>
    {moment(time + 'Z').fromNow()}
  </Tooltip>
)

RelativeTime.displayName = 'RelativeTime'

export default RelativeTime
