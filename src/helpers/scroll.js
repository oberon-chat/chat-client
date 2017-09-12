export const scrollToBottom = (selector) => {
  const container = document.querySelector(selector)

  container.scrollTop = container.scrollHeight
}
