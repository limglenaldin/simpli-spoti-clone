// Built-in API
import { useState } from 'react';

// Components
import NavLink from '../Components/Link/NavLink';
import Song from '../Components/Card/Song';
import DailyMix from '../Components/DailyMix';
import Search from '../Components/Search';

// Data
import { mostPlayed } from '../Data/songs';

const Dashboard = () => {
  const [component, setComponent] = useState('DailyMix')

  const handleClickHome = () => {
    setComponent('DailyMix')
  }

  const handleClickSearch = () => {
    setComponent('Search')
  }

  return (
    <>
      <div className="flex flex-col w-4/12 gap-y-4">
        <div className="bg-neutral-900 p-4 rounded-xl flex flex-col gap-4">
          <NavLink
            href="#"
            icon="house-door-fill"
            name="Home"
            active={component === 'DailyMix'}
            onClick={handleClickHome}
          />
          <NavLink
            href="#"
            icon="search"
            name="Search"
            active={component === 'Search'}
            onClick={handleClickSearch}
          />
        </div>
        <div className="bg-neutral-900 rounded-xl min-h-screen">
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-lg font-semibold"><i className="bi bi-music-note-list mr-3" /> Recently Play</h3>
          </div>
          <div className="flex flex-col px-2 pt-2 pb-4">
            {mostPlayed.map((song) => (
              <Song
                key={song.id}
                data={song}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-neutral-900 w-8/12 rounded-xl p-6">
        {
          component === 'DailyMix'
            ? <DailyMix />
            : <Search />
        }
        
      </div>
    </>
  )
}

export default Dashboard