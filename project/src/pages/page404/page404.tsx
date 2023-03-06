import { Link } from 'react-router-dom';
import './style.css';

const Page404 = (): JSX.Element => (
  <main className="page__main page__main--404">
    <h1>
      404.
      <br />
      <small>Page not found</small>
    </h1>
    <Link to="/">Go to main page</Link>
  </main>
);

export default Page404;
