import { useState } from 'react'
import useList from './useList'
import { initialAccounts, initialCategories, initialNews } from './data'
import Header from './components/Header'
import Menu from './components/Menu'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import News from './pages/News'
import Users from './pages/Users'
import Settings from './pages/Settings'

const ADMIN_MENU = ['Dashboard', 'Category', 'News', 'Users', 'Settings']
const STAFF_MENU = ['Dashboard', 'News', 'Settings']

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('Dashboard')

  const accounts = useList(initialAccounts)
  const categories = useList(initialCategories)
  const news = useList(initialNews)

  // Chua dang nhap -> hien trang Login
  if (!user) {
    return (
      <Login
        accounts={accounts.items}
        onLogin={(u) => {
          setUser(u)
          setPage('Dashboard')
        }}
      />
    )
  }

  const menu = user.role === 1 ? ADMIN_MENU : STAFF_MENU

  const saveProfile = (u) => {
    setUser(u)
    if (u.id !== 0) accounts.update(u)
  }

  return (
    <div className="layout">
      <Header user={user} onLogout={() => setUser(null)} />
      <Menu items={menu} current={page} onChange={setPage} />
      <main className="block content">
        {page === 'Dashboard' && (
          <Dashboard
            accounts={accounts.items}
            categories={categories.items}
            news={news.items}
          />
        )}
        {page === 'Category' && <Categories store={categories} />}
        {page === 'News' && (
          <News
            store={news}
            categories={categories.items}
            accounts={accounts.items}
            user={user}
          />
        )}
        {page === 'Users' && <Users store={accounts} />}
        {page === 'Settings' && <Settings user={user} onSave={saveProfile} />}
      </main>
    </div>
  )
}
