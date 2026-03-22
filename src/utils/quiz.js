import { getRankByRatio } from './ranks.js';

function sortValues(values) {
  return [...values].sort((left, right) => left.localeCompare(right, 'ru'));
}

export function isAnswerCorrect(question, selectedAnswers) {
  const normalizedSelected = sortValues(selectedAnswers ?? []);
  const normalizedCorrect = sortValues(question.correctAnswers);

  return JSON.stringify(normalizedSelected) === JSON.stringify(normalizedCorrect);
}

export function calculateBlockResult(block, answers) {
  const breakdown = block.questions.map((question) => {
    const selectedAnswers = answers[question.id] ?? [];
    const isCorrect = isAnswerCorrect(question, selectedAnswers);

    return {
      questionId: question.id,
      prompt: question.prompt,
      image: question.image ?? null,
      explanation: question.explanation,
      selectedAnswers,
      correctAnswers: question.correctAnswers,
      isMultiple: question.isMultiple,
      isCorrect,
      score: isCorrect ? question.points : 0,
      points: question.points,
      options: question.options,
    };
  });

  const totalScore = breakdown.reduce((sum, item) => sum + item.score, 0);
  const maxScore = block.questions.reduce((sum, question) => sum + question.points, 0);
  const correctCount = breakdown.filter((item) => item.isCorrect).length;
  const ratio = maxScore === 0 ? 0 : totalScore / maxScore;
  const rank = getRankByRatio(ratio);

  return {
    blockId: block.id,
    blockTitle: block.title,
    totalScore,
    maxScore,
    correctCount,
    totalQuestions: block.questions.length,
    ratio,
    rank,
    breakdown,
  };
}

export function calculateSummary(blockResults) {
  const totals = Object.values(blockResults).reduce(
    (accumulator, item) => ({
      totalScore: accumulator.totalScore + item.totalScore,
      maxScore: accumulator.maxScore + item.maxScore,
    }),
    { totalScore: 0, maxScore: 0 },
  );

  const ratio = totals.maxScore === 0 ? 0 : totals.totalScore / totals.maxScore;
  const rank = getRankByRatio(ratio);

  return {
    ...totals,
    ratio,
    rank,
  };
}
