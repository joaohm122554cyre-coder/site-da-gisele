import App from './App'
import DuoPage from './components/DuoPage'
import { usePath, useRouteScroll } from './lib/router'

export default function Root() {
  const path = usePath()
  useRouteScroll(path)
  return path === '/dupla' ? <DuoPage /> : <App />
}
