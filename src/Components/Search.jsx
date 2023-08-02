// Built-in API
import { useContext, useEffect, useState } from "react"

// Context
import { SpotifyContext } from "../Context/SpotifyProvider"

// Components
import Table from "./Table/Table"
import Song from "./Card/Song"

// Utils
import { toaster } from "../utils/toaster"
import { convertMsToTime } from "../utils/converter"

const Search = () => {
  const { token, fetchRefreshToken } = useContext(SpotifyContext)

  const [keyword, setKeyword] = useState()
  const [tracks, setTracks] = useState()

  useEffect(() => {
  }, [tracks])

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

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?${query}`, requestOption)
      const res = await response.json()

      switch (response.status) {
        case 200:
          setTracks(res.tracks.items)
          console.log(res)
          break;
        case 401:
          fetchRefreshToken()
          toaster('error', 'Oops! You\'re not authenticated')
          break;
        case 403:
          toaster('error', 'Oops! Request Forbidden, try again later')
          break;
        case 429:
          toaster('info', 'Oops! You have reach rate limits, try again later')
          break;
        default:
          toaster('error', 'Oops! Unknown error')
          break;
      }
    } catch (error) {
      console.error(`Error ${error}`);
    }
  }

  const handleClickSong = () => {
    toaster('success', 'Yay! the song added into your playlist')
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
            className="bg-neutral-700 rounded-2xl border-0 focus:ring-neutral-200 focus:border-neutral-200 focus:border-0 focus:ring-2 placeholder:text-neutral-500"
          />
          <button type="submit">
            <i className="bi bi-search text-xl" />
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
                        data={{
                          title: track?.name,
                          album_url: track?.album?.images[0].url,
                          artist: track?.artists[0].name
                        }}
                        isDailyMix={true}
                      />
                    </td>
                    <td>{track?.album.name}</td>
                    <td>{convertMsToTime(track?.duration_ms)}</td>
                    <td>
                      <button type="button" onClick={handleClickSong}>
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