export default function Dashboard({ accounts, categories, news }) {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="block card">
          <b>{accounts.length}</b>
          <span>Accounts</span>
        </div>
        <div className="block card">
          <b>{categories.length}</b>
          <span>Categories</span>
        </div>
        <div className="block card">
          <b>{news.length}</b>
          <span>News articles</span>
        </div>
        <div className="block card">
          <b>{news.filter((n) => n.status === 1).length}</b>
          <span>Active news</span>
        </div>
      </div>

      <h3>Tin moi nhat</h3>
      <table className="block">
        <thead>
          <tr>
            <th>Title</th>
            <th>Created date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {news.map((n) => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{n.createdDate}</td>
              <td>{n.status === 1 ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
