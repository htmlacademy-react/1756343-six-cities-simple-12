import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import Page404 from '../../pages/page404/page404';
import { AppRoutes } from '../../const';
import { Offers } from '../../types/offers';

type AppProps = {
  placesFound: number;
  offers: Offers;
}

const App = ({placesFound, offers}: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.Main}>
        <Route index element={<Main placesFound={placesFound} offers={offers} />} />
        <Route path={AppRoutes.Login} element={<Login />} />
        <Route path={AppRoutes.Room} element={<Room />} />
      </Route>
      <Route path={AppRoutes[404]} element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
