import React, { useState } from "react";

const SpotifyContext = React.createContext(null)

const SpotifyProvider = ({ children }) => {
  const accessToken = localStorage.getItem('token')
  const [token, setToken] = useState(JSON.parse(accessToken))

  const fetchToken = async (authCode) => {
    const codeVerifier = localStorage.getItem('code_verifier');
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      code_verifier: codeVerifier
    });

    const requestOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', requestOption)
      const res = await response.json()

      if (response.ok) {
        setToken(res)

        localStorage.setItem('token', JSON.stringify(res))
      } else {
        throw new Error(`HTTP STATUS ${response.status} | Response ${res}`);
      }
    } catch (error) {
      console.error(`Error ${error}`);
    }
  }

  const destroyToken = () => {
    setToken(null)
    localStorage.removeItem('code_verifier')
    localStorage.removeItem('token')
  }

  const fetchRefreshToken = async () => {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      refresh_token: token?.refresh_token
    });

    const requestOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', requestOption)
      const res = await response.json()

      if (response.ok) {
        setToken(res)

        localStorage.setItem('token', JSON.stringify(res))
      } else {
        throw new Error(`HTTP STATUS ${response.status} | Response ${res}`);
      }
    } catch (error) {
      console.error(`Error ${error}`);
    }
  }

  return (
    <SpotifyContext.Provider value={{
      token,
      fetchToken,
      fetchRefreshToken,
      destroyToken
    }}>
      {children}
    </SpotifyContext.Provider>
  )
}

export { SpotifyContext, SpotifyProvider }