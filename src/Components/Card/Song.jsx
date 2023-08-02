const Song = ({ data, isDailyMix = false }) => {
  const imgClass = isDailyMix ? 'w-10 h-10' : 'w-16 h-16'

  return (
    <div className={`flex gap-4 items-center p-2 ${isDailyMix ? '' : 'hover:bg-neutral-950/25'}`}>
      <div className={imgClass}>
        <img src={data?.album_url} alt={`${data?.title} album cover`} className={imgClass}/>
      </div>
      <div>
        <h6 className="font-semibold">{data?.title}</h6>
        <p className="text-gray-400">{data?.artist}</p>
      </div>
    </div>
  )
}

export default Song