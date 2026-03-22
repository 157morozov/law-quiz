import './style.css';

function ResultBreakdown({ result }) {
  return (
    <section className="result-breakdown">
      <div className="result-breakdown__summary">
        <div>
          <span className="result-breakdown__label">Итог блока</span>
          <h2 className="result-breakdown__title">{result.blockTitle}</h2>
        </div>
        <div className="result-breakdown__score-card">
          <span className="result-breakdown__score">{result.totalScore}/{result.maxScore}</span>
          <span className="result-breakdown__rank">{result.rank.badge} {result.rank.title}</span>
        </div>
      </div>

      <div className="result-breakdown__list">
        {result.breakdown.map((item, index) => (
          <article key={item.questionId} className={`result-breakdown__item ${item.isCorrect ? 'result-breakdown__item--correct' : 'result-breakdown__item--wrong'}`}>
            <div className="result-breakdown__item-header">
              <span className="result-breakdown__index">Вопрос {index + 1}</span>
              <span className="result-breakdown__item-score">{item.score}/{item.points}</span>
            </div>
            <h3 className="result-breakdown__item-title">{item.prompt}</h3>
            <p className="result-breakdown__item-line">
              <strong>Твой ответ:</strong> {item.selectedAnswers.length > 0 ? item.selectedAnswers.join(', ') : 'ответ не выбран'}
            </p>
            <p className="result-breakdown__item-line">
              <strong>Правильно:</strong> {item.correctAnswers.join(', ')}
            </p>
            <p className="result-breakdown__item-explanation">{item.explanation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ResultBreakdown;
