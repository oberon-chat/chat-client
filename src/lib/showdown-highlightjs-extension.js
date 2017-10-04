import * as showdown from 'showdown'
import * as highlightjs from 'highlightjs'

// Based on unional/showdown-highlightjs-extension.
// Modified to unescape single and double quotes too.
// See: https://github.com/unional/showdown-highlightjs-extension/

showdown.extension('highlightjs', function () {
  function htmlunencode (text) {
    return (
      text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
    )
  }

  // use new showdown's regexp engine to conditionally parse codeblocks
  const left = '<pre><code\\b[^>]*>'
  const right = '</code></pre>'
  const flags = 'g'

  function replacement (_wholeMatch, match, left, right) {
    // unescape match to prevent double escaping
    match = htmlunencode(match)
    return left + highlightjs.highlightAuto(match).value + right
  }

  return [
    {
      type: 'output',
      filter: function (text, _converter, _options) {
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags)
      }
    }
  ]
})
