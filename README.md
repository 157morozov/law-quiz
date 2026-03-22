# Стражи закона

Минималистичный квиз на React + Vite + Firebase для школьников 9–11 классов.

## Что внутри
- ReactJS без TypeScript.
- Маршрутизация на `react-router-dom@6`.
- State management через Context API.
- Firebase Authentication по email/password.
- Firebase Realtime Database для профиля, прогресса и лидерборда.
- Firebase Hosting с SPA rewrites.

## Запуск
1. Скопируйте `.env.example` в `.env` и заполните Firebase-переменные.
2. Установите зависимости: `npm install`.
3. Запустите проект: `npm run dev`.

## Важно
В этой среде не удалось получить доступ к исходным материалам Google Drive и npm registry, поэтому:
- блок 1 реализован по предоставленному в задаче списку;
- блоки 2 и 3 собраны в близком учебном формате с юридическим уклоном;
- для финальной интеграции с реальными материалами достаточно заменить массивы вопросов в `src/data/blocks.js`.
