const getTextarea = () => {
  let textarea = document.querySelector('#copy-to-clipboard')

  if (!textarea) {
    textarea = document.createElement('textarea')
    textarea.id = 'copy-to-clipboard'
    textarea.style = 'background: inherit; border: none; bottom: 1px; display: hidden; font-size: 1px; height: 1px; left: 0px; line-height: 1px; margin: 0; padding: 0; position: absolute; width: 1px;'
    document.body.appendChild(textarea)
  }

  return textarea
}

export const copyToClipboard = (value) => {
  const textarea = getTextarea()

  textarea.innerHTML = value
  textarea.select()

  try {
    document.execCommand('copy')
    return true
  } catch (_err) {
    return false
  }
}

export default copyToClipboard
