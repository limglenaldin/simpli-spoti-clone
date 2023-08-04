import moment from "moment/moment";

const fetchTokenAPI = async (authCode, setState) => {
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
    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_AUTH_URL}/api/token`, requestOption)
    const res = await response.json()

    if (!response.ok) {
      throw new Error(`HTTP STATUS ${response.status} | Response ${res}`);
    }

    const accessToken = {
      ...res,
      issued_at: moment(),
    }

    setState(accessToken)
    localStorage.setItem('token', JSON.stringify(accessToken))
  } catch (error) {
    console.error(`Error ${error}`);
  }
}

const fetchRefreshTokenAPI = async (token, setState) => {
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
    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_AUTH_URL}/api/token`, requestOption)
    const res = await response.json()

    if (!response.ok) {
      throw new Error(`HTTP STATUS ${response.status} | Response ${res}`);
    }

    const accessToken = {
      ...res,
      issued_at: moment(),
    }

    setState(accessToken)
    localStorage.setItem('token', JSON.stringify(accessToken))
  } catch (error) {
    console.error(`Error ${error}`);
  }
}

export { fetchTokenAPI, fetchRefreshTokenAPI }