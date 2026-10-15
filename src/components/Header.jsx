import Logo from './Logo'
import { ROLES } from '../data'

export default function Header({ user, onLogout }) {
  return (
    <header className="block header">
      <Logo />
      <span>
        {user.name} ({ROLES[user.role]}){' '}
        <button onClick={onLogout}>Logout</button>
      </span>
    </header>
  )
}
