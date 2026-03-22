import { Link } from 'react-router-dom';
import './style.css';

function BlockCard({ block, progress }) {
  const completed = Boolean(progress);

  return (
    <article className={`block-card block-card--${block.accent}`}>
      <div className="block-card__topline">
        <span className="block-card__code">{block.code}</span>
        <span className={`block-card__status ${completed ? 'block-card__status--done' : ''}`}>
          {completed ? 'Пройден' : 'Открыт'}
        </span>
      </div>

      <h3 className="block-card__title">{block.title}</h3>
      <p className="block-card__subtitle">{block.subtitle}</p>
      <p className="block-card__description">{block.description}</p>

      {completed && (
        <div className="block-card__stats">
          <span>Баллы: {progress.score}/{progress.maxScore}</span>
          <span>Верно: {progress.correctCount}/{progress.totalQuestions}</span>
        </div>
      )}

      <Link className="block-card__link" to={`/departments/${block.id}`}>
        {completed ? 'Открыть разбор' : 'Начать расследование'}
      </Link>
    </article>
  );
}

export default BlockCard;
