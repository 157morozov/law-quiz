import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { get, ref, set } from 'firebase/database';
import { BLOCKS, getBlockById } from '../data/blocks.js';
import { useAuth } from './auth-context.jsx';
import { database } from '../services/firebase.js';
import { calculateBlockResult, calculateSummary } from '../utils/quiz.js';

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const { user, profile } = useAuth();
  const [answersByBlock, setAnswersByBlock] = useState({});
  const [resultsByBlock, setResultsByBlock] = useState({});
  const [savedProgress, setSavedProgress] = useState({});

  const saveAnswer = useCallback((blockId, questionId, selectedAnswers) => {
    setAnswersByBlock((previousState) => ({
      ...previousState,
      [blockId]: {
        ...(previousState[blockId] ?? {}),
        [questionId]: selectedAnswers,
      },
    }));
  }, []);

  const resetBlockAnswers = useCallback((blockId) => {
    setAnswersByBlock((previousState) => ({
      ...previousState,
      [blockId]: {},
    }));
  }, []);

  const loadRemoteProgress = useCallback(async () => {
    if (!user) {
      return;
    }

    const snapshot = await get(ref(database, `users/${user.uid}/progress`));

    if (snapshot.exists()) {
      setSavedProgress(snapshot.val());
    }
  }, [user]);

  const submitBlock = useCallback(
    async (blockId) => {
      if (!user || !profile) {
        throw new Error('Для отправки результата требуется авторизация.');
      }

      const block = getBlockById(blockId);

      if (!block) {
        throw new Error('Блок не найден.');
      }

      const answers = answersByBlock[blockId] ?? {};
      const result = calculateBlockResult(block, answers);
      const completedAt = new Date().toISOString();
      const progressPayload = {
        score: result.totalScore,
        maxScore: result.maxScore,
        correctCount: result.correctCount,
        totalQuestions: result.totalQuestions,
        rankKey: result.rank.key,
        completedAt,
      };

      const nextResults = {
        ...resultsByBlock,
        [blockId]: result,
      };
      const summary = calculateSummary(nextResults);

      await Promise.all([
        set(ref(database, `users/${user.uid}/progress/${blockId}`), progressPayload),
        set(ref(database, `users/${user.uid}/summary`), {
          totalScore: summary.totalScore,
          maxScore: summary.maxScore,
          rankKey: summary.rank.key,
          updatedAt: completedAt,
        }),
        set(ref(database, `leaderboard/${user.uid}`), {
          displayName: profile.displayName,
          schoolClass: profile.schoolClass,
          totalScore: summary.totalScore,
          maxScore: summary.maxScore,
          rankKey: summary.rank.key,
          updatedAt: completedAt,
        }),
      ]);

      setResultsByBlock(nextResults);
      setSavedProgress((previousState) => ({
        ...previousState,
        [blockId]: progressPayload,
      }));

      return result;
    },
    [answersByBlock, profile, resultsByBlock, user],
  );

  const summary = useMemo(() => calculateSummary(resultsByBlock), [resultsByBlock]);

  const value = useMemo(
    () => ({
      blocks: BLOCKS,
      answersByBlock,
      resultsByBlock,
      savedProgress,
      summary,
      saveAnswer,
      resetBlockAnswers,
      submitBlock,
      loadRemoteProgress,
    }),
    [answersByBlock, loadRemoteProgress, resetBlockAnswers, resultsByBlock, saveAnswer, savedProgress, submitBlock, summary],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error('useQuiz должен использоваться внутри QuizProvider');
  }

  return context;
}
