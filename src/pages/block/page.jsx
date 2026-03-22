import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProgressBar from '../../components/progress-bar/component.jsx';
import QuestionCard from '../../components/question-card/component.jsx';
import { getBlockById } from '../../data/blocks.js';
import { useQuiz } from '../../contexts/quiz-context.jsx';
import '../../components/progress-bar/style.css';
import '../../components/question-card/style.css';
import './style.css';

function BlockPage() {
  const { blockId } = useParams();
  const navigate = useNavigate();
  const { answersByBlock, saveAnswer, submitBlock } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const block = useMemo(() => getBlockById(blockId), [blockId]);

  if (!block) {
    return (
      <section className="block-page container">
        <div className="block-page__empty">Такой отдел не найден.</div>
      </section>
    );
  }

  const question = block.questions[currentIndex];
  const selectedAnswers = answersByBlock[block.id]?.[question.id] ?? [];
  const isLastQuestion = currentIndex === block.questions.length - 1;
  const hasAnswer = selectedAnswers.length > 0;

  const handleToggleOption = (option) => {
    if (question.isMultiple) {
      const nextAnswers = selectedAnswers.includes(option)
        ? selectedAnswers.filter((item) => item !== option)
        : [...selectedAnswers, option];

      saveAnswer(block.id, question.id, nextAnswers);
      return;
    }

    saveAnswer(block.id, question.id, [option]);
  };

  const handleNext = async () => {
    if (!hasAnswer) {
      return;
    }

    if (!isLastQuestion) {
      setCurrentIndex((previousState) => previousState + 1);
      return;
    }

    setIsSubmitting(true);
    const result = await submitBlock(block.id);
    setIsSubmitting(false);
    navigate(`/results/${result.blockId}`);
  };

  return (
    <section className="block-page container">
      <div className="block-page__topline">
        <div>
          <Link className="block-page__back" to="/departments">← Ко всем отделам</Link>
          <h1 className="block-page__title">{block.title}</h1>
          <p className="block-page__subtitle">{block.subtitle}</p>
        </div>
      </div>

      <ProgressBar current={currentIndex + 1} total={block.questions.length} />

      <QuestionCard question={question} selectedAnswers={selectedAnswers} onToggleOption={handleToggleOption} />

      <div className="block-page__actions">
        <button className="block-page__next" type="button" disabled={!hasAnswer || isSubmitting} onClick={handleNext}>
          {isSubmitting ? 'Отправляем материалы…' : isLastQuestion ? 'Завершить дело' : 'Следующая улика'}
        </button>
      </div>
    </section>
  );
}

export default BlockPage;
