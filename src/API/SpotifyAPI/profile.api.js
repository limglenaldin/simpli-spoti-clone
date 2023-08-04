// utils
import { checkResponse } from "../../Utils/fetch";
import { toaster } from "../../Utils/toaster";

const fetchMyProfileAPI = async (setState, requestOption) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_API_URL}/me`, requestOption)
    const res = await response.json()

    checkResponse(response)

    setState(res)
    localStorage.setItem('profile', JSON.stringify(res))
  } catch (error) {
    toaster('error', error)
    console.error(`Error ${error}`);
  }
}

const fetchMyPlaylistAPI = async (setState, requestOption) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_API_URL}/me/playlists?limit=10&offset=0`, requestOption)
    const res = await response.json()

    checkResponse(response)
    setState(res.items)
  } catch (error) {
    toaster('error', error)
    console.error(`Error ${error}`)
  }
}

const fetchRecommendationAPI = async (setState, query, requestOption) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_API_URL}/recommendations?${query}`, requestOption)
    const res = await response.json()

    console.log(res)

    checkResponse(response)
    setState(res.tracks)
  } catch (error) {
    toaster('error', error)
    console.error(`Error ${error}`)
  }
}

export { fetchMyProfileAPI, fetchMyPlaylistAPI, fetchRecommendationAPI }