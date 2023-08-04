/* eslint-disable react-hooks/exhaustive-deps */
// Built-in Libraries
import { useContext, useEffect, useState } from "react"

// Components
import Table from "../Table/Table"
import Card from "../Card/Card"

// Context
import { SpotifyContext } from "../../Context/SpotifyProvider"

// Data
// import { dailyMix } from "../Data/songs"

// Utils
import { toaster } from "../../Utils/toaster"
import { fetchRecommendationAPI } from "../../API/SpotifyAPI/profile.api"
import { convertMsToTime } from "../../Utils/converter"
import { fetchAddTrackPlaylistAPI } from "../../API/SpotifyAPI/playlist.api"


const Recommendation = () => {
  const { token } = useContext(SpotifyContext)

  const [recommendations, setRecommendations] = useState()

  // OOR : 7k73EtZwoPs516ZxE72KsO
  // MFS : 6cutt8thPFUICMfxaYerWd
  // TOC : 4rqJz9fE9prZvQd8WsQv6q
  // Aimer: 0bAsR2unSRpn6BQPEnNlZm
  // Kenshi Yonezu: 1snhtMLeb2DYoMOcVbb8iB
  const query = new URLSearchParams({
    limit: 10,
    market: 'ID',
    seed_artists: '7k73EtZwoPs516ZxE72KsO,0bAsR2unSRpn6BQPEnNlZm',
    seed_genres: 'j-pop,j-rock,j-idol'
  });

  const requestOption = {
    method: 'GET',
    headers: {
      'Authorization': `${token.token_type} ${token.access_token}`
    },
  }

  useEffect(() => {
    fetchRecommendationAPI(setRecommendations, query, requestOption)
  }, [])

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
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 items-start">
        {/* <div className="w-52 h-52">
          <img
            src="https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb4900a06db4e96dd1444300d4/1/en/default"
            alt="daily mix cover"
          />
        </div> */}
        <div>
          {/* <p className="text-sm">Playlist</p> */}
          <h3 className="text-3xl font-black">Recommendation for you</h3>
          {/* <p className="text-gray-400 text-sm">ONE OK ROCK, MY FIRST STORY, Aimer and more</p>
          <p className="text-sm text-gray-300"><span className="font-semibold">10 songs,</span> about 1 hour</p> */}
        </div>
      </div>
      <div>
        <Table>
          { recommendations?.map((recommendation, i) => (
            <tr key={recommendation.id} className="hover:bg-neutral-950/25">
              <td className="text-center">{i+1}</td>
              <td>
                <Card
                  data={recommendation}
                  isTableView={true}
                />
              </td>
              <td>{recommendation?.album?.name}</td>
              <td>{convertMsToTime(recommendation?.duration_ms)}</td>
              <td>
                <button type="button" onClick={() => handleClickSong(recommendation)}>
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

export default Recommendation