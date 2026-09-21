import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'

// O site tem só duas páginas (a principal e /dupla), então não precisa de biblioteca de rotas.
const listeners = new Set()
const emit = () => listeners.forEach((listener) => listener())

function subscribe(listener) {
  listeners.add(listener)
  window.addEventListener('popstate', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('popstate', listener)
  }
}

const getPath = () => window.location.pathname.replace(/\/+$/, '') || '/'

export const usePath = () => useSyncExternalStore(subscribe, getPath)

export const isPlainClick = (event) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

// returnTo: id do elemento onde a pessoa estava; é para lá que ela volta ao usar o "voltar".
export function navigate(to, { returnTo, block = 'start' } = {}) {
  const url = new URL(to, window.location.href)
  if (returnTo) {
    window.history.replaceState({ ...window.history.state, anchor: returnTo, block: 'center' }, '')
  }
  window.history.pushState(
    { inApp: true, anchor: url.hash.slice(1) || null, block },
    '',
    url.pathname + url.search + url.hash,
  )
  emit()
}

export function goBack(fallback, options) {
  if (window.history.state?.inApp) window.history.back()
  else navigate(fallback, options)
}

// Imagens que carregam depois mexem na altura da página; por isso a rolagem é refeita
// algumas vezes logo após a troca, e para se a pessoa começar a rolar sozinha.
function scrollToAnchor(id, block) {
  let interrupted = false
  const stop = () => {
    interrupted = true
  }
  const events = ['wheel', 'touchstart', 'keydown', 'mousedown']
  events.forEach((name) => window.addEventListener(name, stop, { passive: true }))

  const go = () => {
    if (!interrupted) document.getElementById(id)?.scrollIntoView({ block, behavior: 'instant' })
  }
  go()
  const timers = [250, 700, 1400].map((ms) => setTimeout(go, ms))
  const release = setTimeout(() => events.forEach((name) => window.removeEventListener(name, stop)), 1500)

  return () => {
    timers.forEach(clearTimeout)
    clearTimeout(release)
    events.forEach((name) => window.removeEventListener(name, stop))
  }
}

export function useRouteScroll(path) {
  const previousPath = useRef(path)

  useLayoutEffect(() => {
    if (previousPath.current === path) return
    previousPath.current = path

    window.scrollTo({ top: 0, behavior: 'instant' })
    const { anchor, block } = window.history.state ?? {}
    if (anchor) return scrollToAnchor(anchor, block ?? 'start')
  }, [path])
}
