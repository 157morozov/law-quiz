import { RANKS } from '../../utils/ranks.js';
import './style.css';

function resolveRank(rankKey) {
  return RANKS.find((rank) => rank.key === rankKey) ?? RANKS[0];
}

function LeaderboardTable({ entries }) {
  return (
    <div className="leaderboard-table">
      <div className="leaderboard-table__head">
        <span>#</span>
        <span>Участник</span>
        <span>Класс</span>
        <span>Звание</span>
        <span>Баллы</span>
      </div>

      <div className="leaderboard-table__body">
        {entries.map((entry, index) => {
          const rank = resolveRank(entry.rankKey);
          const percent = entry.maxScore === 0 ? 0 : Math.round((entry.totalScore / entry.maxScore) * 100);

          return (
            <article key={entry.id} className="leaderboard-table__row">
              <span className="leaderboard-table__cell leaderboard-table__cell--place">{index + 1}</span>
              <span className="leaderboard-table__cell">{entry.displayName}</span>
              <span className="leaderboard-table__cell">{entry.schoolClass}</span>
              <span className="leaderboard-table__cell">{rank.badge} {rank.title}</span>
              <span className="leaderboard-table__cell">{entry.totalScore}/{entry.maxScore} · {percent}%</span>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default LeaderboardTable;
