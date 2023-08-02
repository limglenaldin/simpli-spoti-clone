// Built-in Libraries
import { useContext } from 'react';

// Third-party Libraries
import { ToastContainer } from 'react-toastify';

// Context
import { SpotifyContext } from '../Context/SpotifyProvider';

// Pages
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';


const Main = () => {
  const { token } = useContext(SpotifyContext)

  return (
    <main className="flex bg-neutral-950 gap-2 p-3 text-neutral-200">
      {
        token?.access_token  
          ? <Dashboard />
          : <Login />
      }

      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </main>
  )
}

export default Main