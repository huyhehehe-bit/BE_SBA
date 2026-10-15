import { useState } from 'react'

// Hook dung chung cho CRUD tren 1 danh sach
export default function useList(initial) {
  const [items, setItems] = useState(initial)

  const add = (item) => setItems((list) => [...list, { ...item, id: Date.now() }])
  const update = (item) => setItems((list) => list.map((i) => (i.id === item.id ? item : i)))
  const remove = (id) => setItems((list) => list.filter((i) => i.id !== id))

  return { items, add, update, remove }
}
