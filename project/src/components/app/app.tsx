import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import Page404 from '../../pages/page-404/page-404';
import { AppRoutes } from '../../const';

const App = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.Main}>
        <Route index element={<Main />} />
        <Route path={AppRoutes.Login} element={<Login />} />
        <Route path={AppRoutes.Room} element={<Room />} />
      </Route>
      <Route path={AppRoutes.NotFound} element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
