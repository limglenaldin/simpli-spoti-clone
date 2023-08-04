/* eslint-disable react-hooks/exhaustive-deps */

// Built-in Libraries
import { useContext, useEffect, useState } from 'react';

// Third-party Libraries
import moment from "moment";

// Components
import NavLink from '../Components/Link/NavLink';
import Recommendation from '../Components/Custom/Recommendation';
import Search from '../Components/Custom/Search';

// Context
import { SpotifyContext } from '../Context/SpotifyProvider';
import { fetchMyPlaylistAPI } from '../API/SpotifyAPI/profile.api';
import UserInfo from '../Components/Custom/UserInfo';
import List from '../Components/Custom/Playlist/List';
import Add from '../Components/Custom/Playlist/Add';
import { fetchCreatePlaylistAPI, fetchUpdatePlaylistAPI } from '../API/SpotifyAPI/playlist.api';
import Edit from '../Components/Custom/Playlist/Edit';

// Data
// import { mostPlayed } from '../Data/songs';

const Dashboard = () => {
  const { token, profile, fetchProfile, fetchRefreshToken, logout } = useContext(SpotifyContext)

  const [display, setDisplay] = useState({
    mainColumn: 'Recommendation',
    playlistColumn: 'List'
  })
  const [playlists, setPlaylists] = useState()
  const [form, setForm] = useState({
    name: '',
    description: '',
    public: false,
  })
  const [playlistId, setPlaylistId] = useState()

  useEffect(() => {
    if (moment().diff(token?.issued_at, 'second') > token?.expires_in) {
      fetchRefreshToken()
    }
    
    const requestOption = {
      method: 'GET',
      headers: {
        'Authorization': `${token?.token_type} ${token?.access_token}`
      },
    }

    fetchProfile(requestOption)
    
    fetchMyPlaylistAPI(setPlaylists, requestOption)
  }, [form])

  const handleClickDisplay = (type, value) => {
    setDisplay({
      ...display,
      [type]: value
    })
  }

  const handleChangeForm = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmitCreatePlaylist = (e) => {
    e.preventDefault()

    const requestOption = {
      method: 'POST',
      headers: {
        'Authorization': `${token.token_type} ${token.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }

    fetchCreatePlaylistAPI(profile.id, requestOption, setForm, handleClickDisplay)
  }

  const handleSubmitEditPlaylist = (e) => {
    e.preventDefault()

    const requestOption = {
      method: 'PUT',
      headers: {
        'Authorization': `${token.token_type} ${token.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }

    fetchUpdatePlaylistAPI(playlistId, requestOption, setForm, handleClickDisplay)
  }

  const handleEditPlaylist = (data) => {
    setForm({
      ...form,
      name: data?.name,
      description: data?.description,
      public: data?.public,
    })
    setPlaylistId(data?.id)

    handleClickDisplay('playlistColumn', 'Edit')
  }

  console.log(playlists)

  return (
    <>
      <div className="flex flex-col w-4/12 gap-y-4">
        <UserInfo
          profile={profile}
          handleLogOut={logout}
        />
        <div className="bg-neutral-900 p-4 rounded-xl flex flex-col gap-4">
          <NavLink
            href="#"
            icon="house-door-fill"
            name="Home"
            active={display.mainColumn === 'Recommendation'}
            onClick={() => handleClickDisplay('mainColumn', 'Recommendation')}
          />
          <NavLink
            href="#"
            icon="search"
            name="Search"
            active={display.mainColumn === 'Search'}
            onClick={() => handleClickDisplay('mainColumn', 'Search')}
          />
        </div>
        <div className="bg-neutral-900 rounded-xl min-h-screen">
          <div className="flex flex-row justify-between px-4 pt-4 pb-2 text-lg ">
            <h3 className="font-semibold"><i className="bi bi-music-note-list mr-3" /> Playlist</h3>
            {
              display.playlistColumn === 'List'
                ? <button onClick={() => handleClickDisplay('playlistColumn', 'Add')}>
                    <i className="bi bi-plus-lg" />
                  </button>
                : <button onClick={() => handleClickDisplay('playlistColumn', 'List')}>
                    <i className="bi bi-x-lg" />
                  </button>
            }
          </div>
          {
            display.playlistColumn === 'List'
              ? <List
                  playlists={playlists}
                  handleEditPlaylist={handleEditPlaylist}
                />
              : display.playlistColumn === 'Add'
                ? <Add
                    form={form}
                    handleChange={handleChangeForm}
                    handleSubmit={handleSubmitCreatePlaylist}
                  />
                : <Edit
                    form={form}
                    handleChange={handleChangeForm}
                    handleSubmit={handleSubmitEditPlaylist}
                  />
          }
        </div>
      </div>
      <div className="bg-neutral-900 w-8/12 rounded-xl p-6">
        {
          display.mainColumn === 'Recommendation'
            ? <Recommendation />
            : <Search />
        }
      </div>
    </>
  )
}

export default Dashboard