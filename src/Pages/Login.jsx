/* eslint-disable react-hooks/exhaustive-deps */

// Built-in Libraries
import { useContext, useEffect } from "react";

// Utils
import { generateCodeChallenge, generateRandomString } from "../Utils/generator";

// Context
import { SpotifyContext } from "../Context/SpotifyProvider";

const Login = () => {
  const { fetchToken, logout } = useContext(SpotifyContext)

  const handleLoginClick = () => {
    const codeVerifier = generateRandomString(128)

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      const state = generateRandomString(16);
      const scope = 'playlist-modify-public,playlist-modify-private,playlist-read-private,';

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

      window.location = `${process.env.REACT_APP_SPOTIFY_AUTH_URL}/authorize?${args}`
    });
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchToken(code)
    } else {
      logout()
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-row items-center gap-4">
          <i className="text-6xl bi bi-boombox" />
          <h1 className="text-4xl font-semibold">Welcome to Simply Spoti</h1>
        </div>
        <button className="px-4 py-2 bg-green-700 rounded-md" onClick={handleLoginClick}> <i className="bi bi-spotify"></i> Login by Spotify</button>
      </div>
    </div>
  )
}

export default Login;