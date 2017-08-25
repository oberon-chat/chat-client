import {v4} from 'uuid'

export const shortUuid = () => v4().substring(0, 8)

export const uuid = () => v4()

export const isUuid = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)

export default uuid
