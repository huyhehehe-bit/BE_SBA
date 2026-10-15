import { useState } from 'react'
import Modal from '../components/Modal'
import Toolbar from '../components/Toolbar'

const empty = { name: '', description: '', parentId: 0, isActive: 1 }

export default function Categories({ store }) {
  const { items, add, update, remove } = store
  const [keyword, setKeyword] = useState('')
  const [form, setForm] = useState(null) // null = dong popup

  const shown = items.filter((c) =>
    c.name.toLowerCase().includes(keyword.toLowerCase())
  )

  const save = (e) => {
    e.preventDefault()
    if (form.id) update(form)
    else add(form)
    setForm(null)
  }

  const del = (c) => {
    if (window.confirm(`Xoa category "${c.name}"?`)) remove(c.id)
  }

  const parentName = (id) => items.find((c) => c.id === id)?.name || '-'

  return (
    <>
      <h2>Category Management</h2>
      <Toolbar keyword={keyword} onSearch={setKeyword} onCreate={() => setForm(empty)} />

      <table className="block">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Parent</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>{parentName(c.parentId)}</td>
              <td>{c.isActive === 1 ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => setForm(c)}>Edit</button>{' '}
                <button onClick={() => del(c)}>Delete</button>
              </td>
            </tr>
          ))}
          {shown.length === 0 && (
            <tr>
              <td colSpan="5">Khong co du lieu</td>
            </tr>
          )}
        </tbody>
      </table>

      {form && (
        <Modal
          title={form.id ? 'Update category' : 'Create category'}
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
              Description
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </label>
            <label>
              Parent category
              <select
                value={form.parentId}
                onChange={(e) => setForm({ ...form, parentId: Number(e.target.value) })}
              >
                <option value={0}>-- Khong co --</option>
                {items
                  .filter((c) => c.id !== form.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Status
              <select
                value={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: Number(e.target.value) })}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
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
