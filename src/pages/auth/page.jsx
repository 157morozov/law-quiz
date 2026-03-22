import AuthForm from '../../components/auth-form/component.jsx';
import '../../components/auth-form/style.css';
import './style.css';

function AuthPage() {
  return (
    <section className="auth-page container">
      <div className="auth-page__intro">
        <span className="auth-page__eyebrow">Доступ к личному досье</span>
        <h1 className="auth-page__title">Войди или зарегистрируйся, чтобы открыть отделы.</h1>
        <p className="auth-page__text">
          Для сохранения прогресса, подсчёта баллов и участия в таблице лидеров нужен личный аккаунт на Firebase по электронной почте.
        </p>
      </div>
      <AuthForm />
    </section>
  );
}

export default AuthPage;
