import App from './App'
import DuoPage from './components/DuoPage'
import GoldRecordPage from './components/GoldRecordPage'
import PersistentBackground from './components/PersistentBackground'
import { usePath, useRouteScroll } from './lib/router'

export default function Root() {
  const path = usePath()
  useRouteScroll(path)

  let page = <App />
  if (path === '/dupla') page = <DuoPage />
  if (path === '/disco-de-ouro') page = <GoldRecordPage />

  return (
    <>
      <PersistentBackground />
      {page}
    </>
  )
}
