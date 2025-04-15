import MainPage from '../pages/main-page';
import { AppScreenProps } from '../types';

function App({ placeCardsData }: AppScreenProps): JSX.Element {
  return (
    <MainPage placeCardsData = { placeCardsData } />
  );
}

export default App;
