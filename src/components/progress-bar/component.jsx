import './style.css';

function ProgressBar({ current, total }) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="progress-bar">
      <div className="progress-bar__meta">
        <span>Ход расследования</span>
        <span>{current}/{total}</span>
      </div>
      <div className="progress-bar__track" aria-hidden="true">
        <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
