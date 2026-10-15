import { useState } from 'react'
import Logo from '../components/Logo'

export default function Login({ accounts, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    // Yeu cau de bai: user "Admin" / pass "Admin" -> vao trang admin
    if (username === 'Admin' && password === 'Admin') {
      onLogin({ id: 0, name: 'Admin', email: 'Admin', role: 1 })
      return
    }
    const found = accounts.find((a) => a.email === username && a.password === password)
    if (found) onLogin(found)
    else setError('Sai tai khoan hoac mat khau')
  }

  return (
    <div className="login">
      <form className="block" onSubmit={submit}>
        <Logo />
        <h2>Login</h2>
        <label>
          Username / Email
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p className="hint">Admin / Admin - hoac a@fu.edu.vn / 123</p>
      </form>
    </div>
  )
}
