import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner-container" data-testid="spinner">
      <div className="spinner"></div>
      <p className="spinner-text">Loading...</p>
    </div>
  );
}

export default Spinner;
