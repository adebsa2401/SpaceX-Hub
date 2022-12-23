import './styles/MyProfile.css';
import './styles/Rockets.css';
import './styles/Header.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Rockets from './components/Rockets';
import MyProfile from './components/MyProfile';
import Missions from './components/Missions';
import Root from './components/Root';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Rockets />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Route>,
    ),
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
