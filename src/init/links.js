export function initLinkHandler() {
  let initialized = false

  function setupLinks() {
    if (initialized) return
    initialized = true

    setInterval(() => {
      document.querySelectorAll('a[href]:not(.tag)').forEach((link) => {
        link.classList.add('tag')
        link.addEventListener('click', async (e) => {
          const url = link.getAttribute('href')
          if (
            url &&
            !url.startsWith('#') &&
            !url.startsWith('mailto:') &&
            !url.startsWith('tel:')
          ) {
            e.preventDefault()
            showCurtain()
            openLinkWithDelay(url)
          }
        })
      })
    }, 1000)
  }

  function showCurtain() {
    const curtain = document.querySelector('#curtain')
    if (curtain) {
      curtain.style.display = 'block'
      setTimeout(() => {
        curtain.style.display = ''
      }, 3000)
    }
  }

  function openLinkWithDelay(url) {
    setTimeout(() => {
      const a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      a.click()
    }, 900)
  }

  function cleanup() {
    initialized = false
  }

  setupLinks()

  return {
    setup: setupLinks,
    cleanup
  }
}
