import { Analytics } from '@vercel/analytics/react'
import App from './App'
import DuoPage from './components/DuoPage'
import SingleDeOuroPage from './components/SingleDeOuroPage'
import PersistentBackground from './components/PersistentBackground'
import { usePath, useRouteScroll } from './lib/router'

export default function Root() {
  const path = usePath()
  useRouteScroll(path)

  let page = <App />
  if (path === '/dupla') page = <DuoPage />
  // /disco-de-ouro é o endereço antigo (renomeado pro nome certo do prêmio);
  // mantido pra não quebrar quem já tiver esse link salvo.
  if (path === '/single-de-ouro' || path === '/disco-de-ouro') page = <SingleDeOuroPage />

  return (
    <>
      <PersistentBackground active={path !== '/'} />
      {page}
      <Analytics />
    </>
  )
}
