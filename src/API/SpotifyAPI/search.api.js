// Utils
import { checkResponse } from "../../Utils/fetch";
import { toaster } from "../../Utils/toaster";

const searchAPI = async (query, requestOption, setState,) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_API_URL}/search?${query}`, requestOption)
    const res = await response.json()

    checkResponse(response)
    setState(res.tracks.items)
  } catch (error) {
    toaster('error', error)
    console.error(`Error ${error}`);
  }
}

export { searchAPI }