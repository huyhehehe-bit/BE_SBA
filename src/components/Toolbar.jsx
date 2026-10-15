// Thanh Search + nut Create
export default function Toolbar({ keyword, onSearch, onCreate }) {
  return (
    <div className="toolbar">
      <input
        placeholder="Search..."
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button onClick={onCreate}>+ Create</button>
    </div>
  )
}
