import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/auth-context.jsx';
import './style.css';

const initialRegisterState = {
  displayName: '',
  schoolClass: '9',
  email: '',
  password: '',
  consentAccepted: false,
};

const initialLoginState = {
  email: '',
  password: '',
};

function AuthForm() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('login');
  const [registerState, setRegisterState] = useState(initialRegisterState);
  const [loginState, setLoginState] = useState(initialLoginState);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const targetPath = useMemo(() => location.state?.from?.pathname ?? '/departments', [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await login(loginState);
      } else {
        if (!registerState.consentAccepted) {
          throw new Error('Для регистрации нужно согласиться с обработкой персональных данных.');
        }

        await register(registerState);
      }

      navigate(targetPath, { replace: true });
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-form">
      <div className="auth-form__switcher">
        <button
          className={`auth-form__switch-button ${mode === 'login' ? 'auth-form__switch-button--active' : ''}`}
          type="button"
          onClick={() => setMode('login')}
        >
          Вход
        </button>
        <button
          className={`auth-form__switch-button ${mode === 'register' ? 'auth-form__switch-button--active' : ''}`}
          type="button"
          onClick={() => setMode('register')}
        >
          Регистрация
        </button>
      </div>

      <form className="auth-form__form" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <>
            <label className="auth-form__field">
              <span className="auth-form__label">Как к тебе обращаться?</span>
              <input
                className="auth-form__input"
                type="text"
                placeholder="Например, Алина"
                value={registerState.displayName}
                onChange={(event) => setRegisterState((previousState) => ({ ...previousState, displayName: event.target.value }))}
                required
              />
            </label>

            <label className="auth-form__field">
              <span className="auth-form__label">Класс</span>
              <select
                className="auth-form__input"
                value={registerState.schoolClass}
                onChange={(event) => setRegisterState((previousState) => ({ ...previousState, schoolClass: event.target.value }))}
              >
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
            </label>
          </>
        )}

        <label className="auth-form__field">
          <span className="auth-form__label">Электронная почта</span>
          <input
            className="auth-form__input"
            type="email"
            placeholder="name@example.com"
            value={mode === 'login' ? loginState.email : registerState.email}
            onChange={(event) => {
              const updater = (previousState) => ({ ...previousState, email: event.target.value });
              return mode === 'login' ? setLoginState(updater) : setRegisterState(updater);
            }}
            required
          />
        </label>

        <label className="auth-form__field">
          <span className="auth-form__label">Пароль</span>
          <input
            className="auth-form__input"
            type="password"
            placeholder="Не менее 6 символов"
            value={mode === 'login' ? loginState.password : registerState.password}
            onChange={(event) => {
              const updater = (previousState) => ({ ...previousState, password: event.target.value });
              return mode === 'login' ? setLoginState(updater) : setRegisterState(updater);
            }}
            minLength={6}
            required
          />
        </label>

        {mode === 'register' && (
          <label className="auth-form__checkbox">
            <input
              type="checkbox"
              checked={registerState.consentAccepted}
              onChange={(event) => setRegisterState((previousState) => ({ ...previousState, consentAccepted: event.target.checked }))}
            />
            <span>
              Я согласен(на) с <Link to="/privacy">политикой конфиденциальности</Link> и <Link to="/consent">согласием на обработку персональных данных</Link>.
            </span>
          </label>
        )}

        {error && <p className="auth-form__error">{error}</p>}

        <button className="auth-form__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Подождите…' : mode === 'login' ? 'Войти в досье' : 'Создать профиль'}
        </button>
      </form>
    </section>
  );
}

export default AuthForm;
