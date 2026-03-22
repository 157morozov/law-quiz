import { useEffect } from 'react';
import BlockCard from '../../components/block-card/component.jsx';
import { useQuiz } from '../../contexts/quiz-context.jsx';
import '../../components/block-card/style.css';
import './style.css';

function DepartmentsPage() {
  const { blocks, savedProgress, summary, loadRemoteProgress } = useQuiz();
  const maxAvailableScore = blocks.reduce((sum, block) => sum + block.questions.reduce((blockSum, question) => blockSum + question.points, 0), 0);
  const savedTotalScore = Object.values(savedProgress).reduce((sum, item) => sum + (item.score ?? 0), 0);
  const summaryScore = summary.totalScore || savedTotalScore;

  useEffect(() => {
    loadRemoteProgress();
  }, [loadRemoteProgress]);

  return (
    <section className="departments-page container">
      <div className="departments-page__hero">
        <div>
          <span className="departments-page__eyebrow">Оперативный штаб</span>
          <h1 className="departments-page__title">Выбери отдел и начни расследование.</h1>
        </div>
        <div className="departments-page__summary">
          <span className="departments-page__summary-label">Общий результат</span>
          <strong className="departments-page__summary-score">{summaryScore}/{summary.maxScore || maxAvailableScore}</strong>
          <span className="departments-page__summary-rank">{summary.rank.badge} {summary.rank.title}</span>
        </div>
      </div>

      <div className="departments-page__grid">
        {blocks.map((block) => (
          <BlockCard key={block.id} block={block} progress={savedProgress[block.id]} />
        ))}
      </div>
    </section>
  );
}

export default DepartmentsPage;
