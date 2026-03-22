import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import LeaderboardTable from '../../components/leaderboard-table/component.jsx';
import { database } from '../../services/firebase.js';
import '../../components/leaderboard-table/style.css';
import './style.css';

function LeaderboardPage() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const snapshot = await get(ref(database, 'leaderboard'));
        const payload = snapshot.exists() ? snapshot.val() : {};
        const normalized = Object.entries(payload)
          .map(([id, value]) => ({ id, ...value }))
          .sort((left, right) => {
            if (right.totalScore !== left.totalScore) {
              return right.totalScore - left.totalScore;
            }

            return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
          });

        setEntries(normalized);
        setStatus('ready');
      } catch (error) {
        setStatus('error');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="leaderboard-page container">
      <div className="leaderboard-page__hero">
        <span className="leaderboard-page__eyebrow">Таблица лидеров</span>
        <h1 className="leaderboard-page__title">Кто раскрыл больше всего дел?</h1>
        <p className="leaderboard-page__text">
          В рейтинг попадают только итоговые баллы и безопасный публичный профиль: имя и класс.
        </p>
      </div>

      {status === 'loading' && <div className="leaderboard-page__status">Загружаем рейтинг…</div>}
      {status === 'error' && <div className="leaderboard-page__status">Не удалось загрузить рейтинг. Проверь Firebase-конфигурацию.</div>}
      {status === 'ready' && <LeaderboardTable entries={entries} />}
    </section>
  );
}

export default LeaderboardPage;
