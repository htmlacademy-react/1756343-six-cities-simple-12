import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import Page404 from '../../pages/page404/page404';
import { AppRoutes } from '../../const';

type AppProps = {
  placesFound: number;
}

const App = ({placesFound}: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.Main}>
        <Route index element={<Main placesFound={placesFound} />} />
        <Route path={AppRoutes.Login} element={<Login />} />
        <Route path={AppRoutes.Room} element={<Room />} />
      </Route>
      <Route path={AppRoutes[404]} element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
