import MainPage from '../pages/main-page';

type AppScreenProps = {
  numberCards: number;
}

function App({numberCards}: AppScreenProps): JSX.Element {
  return (
    <MainPage numberCards={numberCards} />
  );
}

export default App;
