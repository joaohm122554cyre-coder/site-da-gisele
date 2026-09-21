import { isPlainClick, navigate } from '../lib/router'

export default function Link({ to, returnTo, block, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || !isPlainClick(event) || props.target === '_blank') return
    event.preventDefault()
    navigate(to, { returnTo, block })
  }
  return <a href={to} onClick={handleClick} {...props} />
}
