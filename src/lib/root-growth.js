// Estado compartilhado da "raiz" decorativa: nasce quando a semente da linha
// do tempo chega ao fim, e pausa enquanto um clipe está tocando.
let unlocked = false
const unlockListeners = new Set()

export function isRootUnlocked() {
  return unlocked
}

export function unlockRoot() {
  if (unlocked) return
  unlocked = true
  unlockListeners.forEach((fn) => fn(true))
}

export function subscribeRootUnlock(fn) {
  unlockListeners.add(fn)
  return () => unlockListeners.delete(fn)
}

let videoActive = false
const videoListeners = new Set()

export function isVideoActive() {
  return videoActive
}

export function setVideoActive(value) {
  if (videoActive === value) return
  videoActive = value
  videoListeners.forEach((fn) => fn(value))
}

export function subscribeVideoActivity(fn) {
  videoListeners.add(fn)
  return () => videoListeners.delete(fn)
}
