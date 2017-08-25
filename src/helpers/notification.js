import { notification as antNotification } from 'antd'

export const notification = (message, type = 'success', options = {}) => {
  antNotification.open({
    placement: 'bottomRight',
    message: message,
    type: type,
    ...options
  })
}

export default notification
