import { useState } from 'react'
import { ROLES } from '../data'

export default function Settings({ user, onSave }) {
  const [form, setForm] = useState(user)
  const [saved, setSaved] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    onSave(form)
    setSaved(true)
  }

  return (
    <>
      <h2>Settings</h2>
      <form className="block form-block" onSubmit={submit}>
        <label>
          Name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          Email
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Role
          <input value={ROLES[form.role]} readOnly />
        </label>
        <button type="submit">Save</button>
        {saved && <p>Da luu.</p>}
      </form>
    </>
  )
}
