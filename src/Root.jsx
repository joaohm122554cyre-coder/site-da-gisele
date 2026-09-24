import App from './App'
import DuoPage from './components/DuoPage'
import GoldRecordPage from './components/GoldRecordPage'
import { usePath, useRouteScroll } from './lib/router'

export default function Root() {
  const path = usePath()
  useRouteScroll(path)
  if (path === '/dupla') return <DuoPage />
  if (path === '/disco-de-ouro') return <GoldRecordPage />
  return <App />
}
