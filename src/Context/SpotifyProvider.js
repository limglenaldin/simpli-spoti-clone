// Built-in Libraries
import React, { useState } from "react";

// Third-party Libraries
import moment from "moment";

// API Call
import { fetchRefreshTokenAPI, fetchTokenAPI } from "../API/SpotifyAPI/authentication.api";
import { fetchMyProfileAPI } from "../API/SpotifyAPI/profile.api";

const SpotifyContext = React.createContext(null)

const SpotifyProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')))
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))

  const fetchToken = (authCode) => {
    fetchTokenAPI(authCode, setToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('code_verifier')
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
  }

  const fetchRefreshToken = () => {
    fetchRefreshTokenAPI(token, setToken)
  }

  const fetchProfile = (requestOption) => {
    if (moment().diff(token?.issued_at, 'second') > token?.expires_in) {
      fetchRefreshToken()
    }

    fetchMyProfileAPI(setProfile, requestOption)
  }

  return (
    <SpotifyContext.Provider value={{
      token,
      profile,
      fetchToken,
      fetchRefreshToken,
      fetchProfile,
      logout
    }}>
      {children}
    </SpotifyContext.Provider>
  )
}

export { SpotifyContext, SpotifyProvider }