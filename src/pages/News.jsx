import { useState } from 'react'
import Modal from '../components/Modal'
import Toolbar from '../components/Toolbar'

export default function News({ store, categories, accounts, user }) {
  const { items, add, update, remove } = store
  const [keyword, setKeyword] = useState('')
  const [form, setForm] = useState(null)

  const empty = {
    title: '',
    headline: '',
    content: '',
    source: '',
    categoryId: categories[0]?.id || 0,
    tags: '',
    status: 1,
    createdById: user.id,
    createdDate: new Date().toISOString().slice(0, 10),
  }

  const shown = items.filter(
    (n) =>
      n.title.toLowerCase().includes(keyword.toLowerCase()) ||
      n.headline.toLowerCase().includes(keyword.toLowerCase())
  )

  const save = (e) => {
    e.preventDefault()
    if (form.id) update(form)
    else add(form)
    setForm(null)
  }

  const del = (n) => {
    if (window.confirm(`Xoa bai viet "${n.title}"?`)) remove(n.id)
  }

  const categoryName = (id) => categories.find((c) => c.id === id)?.name || '-'
  const authorName = (id) => accounts.find((a) => a.id === id)?.name || 'Admin'

  return (
    <>
      <h2>News Article Management</h2>
      <Toolbar keyword={keyword} onSearch={setKeyword} onCreate={() => setForm(empty)} />

      <table className="block">
        <thead>
          <tr>
            <th>Title</th>
            <th>Headline</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Created by</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((n) => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{n.headline}</td>
              <td>{categoryName(n.categoryId)}</td>
              <td>{n.tags}</td>
              <td>{authorName(n.createdById)}</td>
              <td>{n.createdDate}</td>
              <td>{n.status === 1 ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => setForm(n)}>Edit</button>{' '}
                <button onClick={() => del(n)}>Delete</button>
              </td>
            </tr>
          ))}
          {shown.length === 0 && (
            <tr>
              <td colSpan="8">Khong co du lieu</td>
            </tr>
          )}
        </tbody>
      </table>

      {form && (
        <Modal
          title={form.id ? 'Update news article' : 'Create news article'}
          onClose={() => setForm(null)}
        >
          <form onSubmit={save}>
            <label>
              Title
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>
            <label>
              Headline
              <input
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
              />
            </label>
            <label>
              Content
              <textarea
                rows="4"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </label>
            <label>
              Source
              <input
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
            </label>
            <label>
              Category
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tags (cach nhau bang dau phay)
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </label>
            <label>
              Status
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: Number(e.target.value) })}
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
