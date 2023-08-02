// Third-party Libraries
import 'bootstrap-icons/font/bootstrap-icons.css'

// Components
import Main from './Layouts/Main';

// Context Provider
import { SpotifyProvider } from './Context/SpotifyProvider';

function App() {
  return (
    <>
      <SpotifyProvider>
        <Main />
      </SpotifyProvider>
    </>
  );
}

export default App;
