import showdown from 'showdown'
import escapeHtml from 'escape-html'
import sanitizeHtml from 'sanitize-html'
import 'showdown-highlightjs-extension'

export const createParser = (passedOptions = {}) => {
  showdown.setFlavor('github')

  return new showdown.Converter({
    ...passedOptions,
    extensions: ['highlightjs']
  })
}

export const addCopyCodeBlocks = (value) => {
  const icon = '<a class="copy-code-to-clipboard" href="#"><i class="anticon anticon-copy"></i></a>'

  return value.replace(/<pre><code/g, '<pre>' + icon + '<code')
}

export const markdownToHtml = (value, options = {}) => {
  const parser = createParser(options)
  const escaped = escapeHtml(value)
  const html = parser.makeHtml(escaped)
  const withExtensions = addCopyCodeBlocks(html)
  const sanitized = sanitizeHtml(withExtensions)

  return sanitized
}

export const updateChecklist = (value, index, isChecked) => {
  let matchIndex = -1

  const markdownForCheckbox = /[-*] \[[vVxX ]\]/g
  const result = value.replace(markdownForCheckbox, (match) => {
    matchIndex = matchIndex + 1

    if (matchIndex !== index) {
      return match
    }

    return isChecked ? '- [x]' : '- [ ]'
  })

  return result
}
