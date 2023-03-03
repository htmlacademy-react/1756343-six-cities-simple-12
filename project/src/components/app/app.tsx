import Main from '../../pages/main/main';

type AppProps = {
  placesFound: number;
}

const App = ({placesFound}: AppProps): JSX.Element => (
  <Main placesFound={placesFound} />
);

export default App;
