import { Outlet } from 'react-router-dom';
import Header from './Header';

const Root = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Root;
