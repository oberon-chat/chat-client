export const scrollToBottom = (selector) => {
  const container = document.querySelector(selector)

  if (container) {
    container.scrollTop = container.scrollHeight
  }
}
