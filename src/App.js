import './styles/MyProfile.css';
import './styles/Rockets.css';
import './styles/Header.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Rockets from './components/Rockets';
import MyProfile from './components/MyProfile';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <Rockets />
        )}
        />
        <Route
          path="/myprofile"
          element={(
            <MyProfile />
        )}
        />
      </Routes>
    </>
  );
}

export default App;
