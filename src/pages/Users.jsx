import { useState } from 'react'
import Modal from '../components/Modal'
import Toolbar from '../components/Toolbar'
import { ROLES } from '../data'

const empty = { name: '', email: '', password: '', role: 2 }

export default function Users({ store }) {
  const { items, add, update, remove } = store
  const [keyword, setKeyword] = useState('')
  const [form, setForm] = useState(null)

  const shown = items.filter(
    (a) =>
      a.name.toLowerCase().includes(keyword.toLowerCase()) ||
      a.email.toLowerCase().includes(keyword.toLowerCase())
  )

  const save = (e) => {
    e.preventDefault()
    if (form.id) update(form)
    else add(form)
    setForm(null)
  }

  const del = (a) => {
    if (window.confirm(`Xoa tai khoan "${a.name}"?`)) remove(a.id)
  }

  return (
    <>
      <h2>Account Management</h2>
      <Toolbar keyword={keyword} onSearch={setKeyword} onCreate={() => setForm(empty)} />

      <table className="block">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{ROLES[a.role]}</td>
              <td>
                <button onClick={() => setForm(a)}>Edit</button>{' '}
                <button onClick={() => del(a)}>Delete</button>
              </td>
            </tr>
          ))}
          {shown.length === 0 && (
            <tr>
              <td colSpan="4">Khong co du lieu</td>
            </tr>
          )}
        </tbody>
      </table>

      {form && (
        <Modal
          title={form.id ? 'Update account' : 'Create account'}
          onClose={() => setForm(null)}
        >
          <form onSubmit={save}>
            <label>
              Name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label>
              Password
              <input
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>
            <label>
              Role
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: Number(e.target.value) })}
              >
                <option value={1}>Admin</option>
                <option value={2}>Staff</option>
              </select>
            </label>
            <div className="modal-foot">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setForm(null)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
