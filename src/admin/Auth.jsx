import { useState, useRef, useEffect } from 'react';
import './Auth.css';

export default function Auth({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const loginRef = useRef(null);

  useEffect(() => {
    loginRef.current?.focus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!login.trim() || !password.trim()) {
      setError('Пожалуйста, введите логин и пароль');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Пример простейшей проверки (заменить на реальную)
      if (login === 'TRadmin' && password === '123') {
        onLogin();
      } else {
        setError('Неверный логин или пароль');
        setIsLoading(false);
        loginRef.current?.focus();
      }
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Вход в админ-панель</h2>
          <p>Введите логин и пароль для доступа</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label htmlFor="login">Логин</label>
            <input
              ref={loginRef}
              id="login"
              type="text"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setError('');
              }}
              placeholder="Введите логин"
              autoComplete="username"
              className="auth-input"
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Введите пароль"
              autoComplete="current-password"
              className="auth-input"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading || !login.trim() || !password.trim()}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              'Войти'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <small>Админ-панель сайта</small>
        </div>
      </div>
    </div>
  );
}
