/* eslint-disable react-hooks/exhaustive-deps */

// Built-in API
import { useContext, useEffect } from "react";

// Utils
import { generateCodeChallenge, generateRandomString } from "../utils/generator";

// Context
import { SpotifyContext } from "../Context/SpotifyProvider";

const Login = () => {
  const { fetchToken, destroyToken } = useContext(SpotifyContext)

  const handleLoginClick = () => {
    const codeVerifier = generateRandomString(128)

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      const state = generateRandomString(16);
      const scope = 'playlist-modify-private';

      localStorage.setItem('code_verifier', codeVerifier);

      const args = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });

      window.location = `${process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT}?${args}`
    });
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchToken(code)
    } else {
      destroyToken()
    }
  }, [])

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-row items-center gap-4">
          <i className="bi bi-boombox text-6xl" />
          <h1 className="text-4xl font-semibold">Welcome to Simply Spoti</h1>
        </div>
        <button className="bg-green-500 py-2 px-4 rounded-md" onClick={handleLoginClick}> <i className="bi bi-spotify"></i> Login by Spotify</button>
      </div>
    </div>
  )
}

export default Login;