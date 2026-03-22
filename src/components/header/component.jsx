import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context.jsx';
import './style.css';

function Header() {
  const { user, profile, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__inner container">
        <Link className="header__brand" to="/">
          <span className="header__brand-badge">⚖️</span>
          <span className="header__brand-text">Стражи закона</span>
        </Link>

        <nav className="header__nav" aria-label="Основная навигация">
          <NavLink className="header__nav-link" to="/leaderboard">
            Рейтинг
          </NavLink>
          {user ? (
            <>
              <NavLink className="header__nav-link" to="/departments">
                Отделы
              </NavLink>
              <button className="header__logout" type="button" onClick={logout}>
                Выйти
              </button>
            </>
          ) : (
            <NavLink className="header__nav-link" to="/auth">
              Войти
            </NavLink>
          )}
        </nav>

        <div className="header__profile">
          {user ? (
            <>
              <span className="header__profile-name">{profile?.displayName ?? user.email}</span>
              <span className="header__profile-meta">{profile?.schoolClass ?? '—'} класс</span>
            </>
          ) : (
            <span className="header__profile-meta">Учись, расследуй, побеждай</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
