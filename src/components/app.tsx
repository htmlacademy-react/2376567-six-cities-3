import MainPage from '../pages/main-page';
import { AppScreenProps } from '../types';

function App({ cardsData }: AppScreenProps): JSX.Element {
  return (
    <MainPage cardsData={cardsData} />
  );
}

export default App;
