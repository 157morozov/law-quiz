export const RANKS = [
  {
    key: 'cadet',
    title: 'Кадет участка',
    minRatio: 0,
    badge: '🟢',
    description: 'Ты только вступаешь в расследование, но уже уверенно собираешь факты.',
  },
  {
    key: 'investigator',
    title: 'Следователь отдела',
    minRatio: 0.45,
    badge: '🔎',
    description: 'Умеешь замечать важные детали и не теряешь нить дела.',
  },
  {
    key: 'captain',
    title: 'Капитан правопорядка',
    minRatio: 0.7,
    badge: '🛡️',
    description: 'Ты уверенно ориентируешься в правовых понятиях и фото-уликах.',
  },
  {
    key: 'legend',
    title: 'Легенда отдела',
    minRatio: 0.9,
    badge: '🏆',
    description: 'Почти идеальное расследование: ты настоящий страж закона.',
  },
];

export function getRankByRatio(ratio) {
  return [...RANKS].reverse().find((rank) => ratio >= rank.minRatio) ?? RANKS[0];
}
