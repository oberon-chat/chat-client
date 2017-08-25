import showdown from 'showdown'
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
  const html = parser.makeHtml(value)
  const withExtensions = addCopyCodeBlocks(html)

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
