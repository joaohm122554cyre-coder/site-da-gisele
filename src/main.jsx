import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// link direto para uma seção (ex.: /#ensaio-azul): rola até ela assim que a página monta
const targetId = decodeURIComponent(window.location.hash.slice(1))
if (targetId) {
  let tries = 0
  const goToTarget = () => {
    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' })
    else if (tries++ < 40) setTimeout(goToTarget, 100)
  }
  goToTarget()
}
