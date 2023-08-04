// Built-in Libraries
import { useContext, useEffect, useState } from "react"

// Context
import { SpotifyContext } from "../../Context/SpotifyProvider"

// Third-party Libraries
import moment from "moment";

// Components
import Table from "../Table/Table"
import Song from "../Card/Card"

// Utils
import { toaster } from "../../Utils/toaster"
import { convertMsToTime } from "../../Utils/converter"

// API Call
import { searchAPI } from "../../API/SpotifyAPI/search.api"
import { fetchAddTrackPlaylistAPI } from "../../API/SpotifyAPI/playlist.api";

const Search = () => {
  const { token, fetchRefreshToken } = useContext(SpotifyContext)

  const [keyword, setKeyword] = useState()
  const [tracks, setTracks] = useState()

  useEffect(() => {
  }, [tracks])

  console.log(tracks)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      q: keyword,
      type: 'track',
      market: 'ID',
      limit: 10
    });
  
    const requestOption = {
      method: 'GET',
      headers: {
        'Authorization': `${token.token_type} ${token.access_token}`
      },
    }

    if (moment().diff(token?.issued_at, 'second') > token?.expires_in) {
      fetchRefreshToken()
    }

    searchAPI( query, requestOption, setTracks)
  }

  const handleClickSong = (data) => {
    const requestOption = {
      method: 'POST',
      headers: {
        'Authorization': `${token.token_type} ${token.access_token}`
      },
      body: JSON.stringify({
        uris: [data?.uri],
        position: 0
      })
    }

    fetchAddTrackPlaylistAPI('7AJkbv7Kr36WvFUUDYOqti', requestOption)
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <form className="flex gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="keyword"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
            placeholder="What do you want to listen to?"
            className="border-0 bg-neutral-700 rounded-2xl focus:ring-neutral-200 focus:border-neutral-200 focus:border-0 focus:ring-2 placeholder:text-neutral-500"
          />
          <button type="submit">
            <i className="text-xl bi bi-search" />
          </button>
        </form>
        {
          tracks 
            ? <Table>
                { tracks.map((track, i) => (
                  <tr key={track?.id} className="hover:bg-neutral-950/25">
                    <td className="text-center">{i+1}</td>
                    <td>
                      <Song
                        data={track}
                        isTableView={true}
                      />
                    </td>
                    <td>{track?.album.name}</td>
                    <td>{convertMsToTime(track?.duration_ms)}</td>
                    <td>
                    <button type="button" onClick={() => handleClickSong(track)}>
                      <i className="bi bi-heart" />
                    </button>
                    </td>
                  </tr>
                )) }
              </Table>
            : <></>
        }
      </div>
    </>
  )
}

export default Search