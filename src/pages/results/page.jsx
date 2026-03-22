import { Link, useParams } from 'react-router-dom';
import ResultBreakdown from '../../components/result-breakdown/component.jsx';
import { useQuiz } from '../../contexts/quiz-context.jsx';
import '../../components/result-breakdown/style.css';
import './style.css';

function ResultsPage() {
  const { blockId } = useParams();
  const { resultsByBlock } = useQuiz();
  const result = resultsByBlock[blockId];

  if (!result) {
    return (
      <section className="results-page container">
        <div className="results-page__empty">
          <p>Результат пока не найден. Сначала заверши прохождение блока.</p>
          <Link className="results-page__link" to="/departments">Перейти к отделам</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="results-page container">
      <ResultBreakdown result={result} />
      <div className="results-page__actions">
        <Link className="results-page__link" to="/departments">К отделам</Link>
        <Link className="results-page__link results-page__link--accent" to="/leaderboard">Открыть рейтинг</Link>
      </div>
    </section>
  );
}

export default ResultsPage;
