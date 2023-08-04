const Card = ({ data, isTableView = false, handleEditPlaylist }) => {
  const imgClass = isTableView ? 'w-10 h-10' : 'w-16 h-16'

  return (
    <div className={`flex items-center justify-between p-2 ${isTableView ? '' : 'hover:bg-neutral-950/25'} group/card`}>
      <div className="flex gap-4 items-center">
        <div className={imgClass}>
          <img src={data?.type === 'track' ? data?.album?.images[0].url : data?.images[0]?.url} alt={`${data?.name} cover`} className={imgClass}/>
        </div>
        <div>
          <h6 className="font-semibold">{data?.name}</h6>
          <p className="text-gray-400">{data?.type === 'track' ? data?.artists[0].name : data?.owner?.display_name}</p>
        </div>
      </div>
      {
        data?.type === 'playlist'
        ? <div className="invisible group-hover/card:visible flex flex-row gap-4">
            <button className="hover:text-green-700" onClick={() => handleEditPlaylist(data)}>
              <i className="bi bi-pencil-square text-lg" />
            </button>
            {/* <button className="hover:text-green-700">
              <i className="bi bi-trash text-lg" />
            </button> */}
          </div>
        : <></>
      }
    </div>
  )
}

export default Card