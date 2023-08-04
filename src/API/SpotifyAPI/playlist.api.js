import { checkResponse } from "../../Utils/fetch"
import { toaster } from "../../Utils/toaster"

const fetchCreatePlaylistAPI = async (id, requestOption, setForm, redirect) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_API_URL}/users/${id}/playlists`, requestOption)
    const res = await response.json

    checkResponse(response)
    setForm({
      name: '',
      description: '',
      public: false,
    })
    redirect('playlistColumn', 'List')
    toaster('success', `Success Created ${res.name} playlist`)
  } catch (error) {
    toaster('error', error)
    console.error(`Error ${error}`)
  }
}

const fetchUpdatePlaylistAPI = async (id, requestOption, setForm, redirect) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_API_URL}/playlists/${id}`, requestOption)
    const res = await response.json

    checkResponse(response)
    setForm({
      name: '',
      description: '',
      public: false,
    })
    redirect('playlistColumn', 'List')
    toaster('success', `Success Update ${res.name} playlist`)
  } catch (error) {
    toaster('error', error)
    console.error(`Error ${error}`)
  }
}

const fetchAddTrackPlaylistAPI = async (id, requestOption) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_API_URL}/playlists/${id}/tracks`, requestOption)
    const res = await response.json

    checkResponse(response)
    toaster('success', `Success add track to playlist`)
  } catch (error) {
    toaster('error', error)
    console.error(`Error ${error}`)
  }
}

export { fetchCreatePlaylistAPI, fetchUpdatePlaylistAPI, fetchAddTrackPlaylistAPI }