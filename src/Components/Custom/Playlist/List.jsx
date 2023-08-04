import Card from "../../Card/Card"

const List = ({playlists, handleEditPlaylist}) => {
  return (
    <div className="flex flex-col px-2 pt-2 pb-4">
      {playlists?.map((playlist) => (
        <Card
          key={playlist.id}
          data={playlist}
          handleEditPlaylist={handleEditPlaylist}
        />
      ))}
    </div>
  )
}

export default List