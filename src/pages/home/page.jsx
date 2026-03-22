import { Link } from 'react-router-dom';
import './style.css';

function HomePage() {
  return (
    <section className="home-page container">
      <div className="home-page__hero">
        <div className="home-page__content">
          <span className="home-page__eyebrow">Детективный квиз по праву</span>
          <h1 className="home-page__title">Расследуй три дела и стань легендой школьного отдела.</h1>
          <p className="home-page__text">
            «Стражи закона» — это минималистичный квиз для учеников 9–11 классов. Здесь есть отделы,
            каскадное прохождение вопросов, итоговые звания и лидерборд.
          </p>
          <div className="home-page__actions">
            <Link className="home-page__button home-page__button--primary" to="/auth">
              Начать расследование
            </Link>
            <Link className="home-page__button" to="/leaderboard">
              Смотреть рейтинг
            </Link>
          </div>
        </div>

        <div className="home-page__panel">
          <div className="home-page__panel-card">
            <span className="home-page__panel-label">Формат</span>
            <strong>3 отдела · 20+ заданий · 4 звания</strong>
          </div>
          <div className="home-page__panel-card">
            <span className="home-page__panel-label">Механика</span>
            <strong>Вопрос за вопросом, ответы раскрываются только в конце</strong>
          </div>
          <div className="home-page__panel-card">
            <span className="home-page__panel-label">Для кого</span>
            <strong>Российские школьники 9–11 классов</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
