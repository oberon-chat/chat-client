import history from '../app/history'

const Redirect = ({ to }) => {
  history.push(to)

  return null
}

export default Redirect
