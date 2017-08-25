import { forEach } from 'lodash'

// Matching rules should be in descending order from most to least specific
export const activeKeys = (currentPath) => {
  const matchers = {
    '/notes/new': ['notes', 'new-note'],
    '/notes/(.*)/edit': ['notes', 'edit-note'],
    '/notes/(.*)': ['notes', 'all-notes'],
    '/notes': ['notes', 'all-notes'],
    '/labels/(.*)/notes': ['notes'],
    '/labels/(.*)/notes/.*': ['notes'],
    '/labels/(.*)': ['labels'],
    '/labels/new': ['labels'],
    '/labels/(.*)/edit': ['labels'],
    '/labels': ['labels'],
    '/settings': ['settings'],
    '/': ['home']
  }

  let result = []

  forEach(matchers, (values, regex) => {
    const pattern = new RegExp('^' + regex + '$')
    const path = currentPath || ''
    const match = path.match(pattern)

    if (match) {
      result = values.concat(match)
      return false
    }
  })

  return result
}

export default activeKeys
