const Table = ({ children }) => {
  return (
    <table className="min-w-full">
      <thead className="text-left border-b-2 border-neutral-400">
        <tr>
          <th className="pb-4 font-light">#</th>
          <th className="pb-4 font-light">Title</th>
          <th className="pb-4 font-light">Album</th>
          <th className="pb-4 font-light">Duration</th>
          <th className="pb-4 font-light"></th>
        </tr>
      </thead>
      <tbody>
        { children }
      </tbody>
    </table>
  )
}

export default Table