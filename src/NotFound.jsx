import React from 'react';
import { Link } from 'react-router-dom'; // Если используете react-router

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white-500 to-blue-600">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center relative">
        {/* SVG-иконка для визуального эффекта */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <svg
            className="w-24 h-24 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 10v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Анимированный заголовок */}
        <h1 className="mt-16 text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800 dark:text-gray-300">
          Страница не найдена
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Страница, которую вы ищете, не существует или была перемещена.
        </p>

        {/* Кнопка для возврата на главную */}
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow hover:bg-blue-600 transition duration-300"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
