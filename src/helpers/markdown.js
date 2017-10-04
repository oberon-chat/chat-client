import showdown from 'showdown'
import escapeHtml from 'escape-html'
import sanitizeHtml from 'sanitize-html'
import '../lib/showdown-highlightjs-extension'

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
  const sanitized = sanitizeHtml(html, {
    allowedAttributes: {
      a: [ 'href', 'name', 'target' ],
      code: [ 'class' ],
      img: [ 'src' ],
      span: [ 'class' ]
    },
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'span', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre'
    ]
  })
  const withExtensions = addCopyCodeBlocks(sanitized)

  return withExtensions
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
