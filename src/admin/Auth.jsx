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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!login.trim() || !password.trim()) {
      setError('Пожалуйста, введите логин и пароль');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://ta-server.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка входа');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token); // JWT токен
      onLogin(); // Успешный вход

    } catch (err) {
      setError(err.message || 'Ошибка сервера');
      loginRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
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
            {isLoading ? <span className="spinner"></span> : 'Войти'}
          </button>
        </form>

        <div className="auth-footer">
          <small>Админ-панель сайта</small>
        </div>
      </div>
    </div>
  );
}
