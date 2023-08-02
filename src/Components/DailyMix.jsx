// Components
import Table from "./Table/Table"
import Song from "./Card/Song"

// Data
import { dailyMix } from "../Data/songs"

// Utils
import { toaster } from "../utils/toaster"

const DailyMix = () => {
  const handleClickSong = () => {
    toaster('success', 'Yay! the song added into your playlist')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 items-end">
        <div className="w-52 h-52">
          <img
            src="https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb4900a06db4e96dd1444300d4/1/en/default"
            alt="daily mix cover"
          />
        </div>
        <div>
          <p className="text-sm">Playlist</p>
          <h3 className="text-7xl font-black py-2 my-6">Daily Mix</h3>
          <p className="text-gray-400 text-sm">ONE OK ROCK, MY FIRST STORY, Aimer and more</p>
          <p className="text-sm text-gray-300"><span className="font-semibold">10 songs,</span> about 1 hour</p>
        </div>
      </div>
      <div>
        <Table>
          { dailyMix.map((song, i) => (
            <tr key={song.id} className="hover:bg-neutral-950/25">
              <td className="text-center">{i+1}</td>
              <td>
                <Song
                  data={song}
                  isDailyMix={true}
                />
              </td>
              <td>{song.album}</td>
              <td>{song.duration}</td>
              <td>
                <button type="button" onClick={handleClickSong}>
                  <i className="bi bi-heart" />
                </button>
              </td>
            </tr>
          )) }
        </Table>
      </div>
    </div>
  )
}

export default DailyMix