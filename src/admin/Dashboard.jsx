import { useState, useEffect } from 'react';
import TextEditor from './TextEditor';
import Auth from './Auth';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('text');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('https://ta-server.onrender.com/api/admin-data', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      });
  }, []);

  if (!isAuthenticated) {
    return <Auth onLogin={(token) => {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    }} />;
  }

  return (
    <div className="min-h-screen mt-24 bg-white-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h1 className="text-2xl font-bold text-white">Админ-панель</h1>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-6 py-3 font-medium text-sm focus:outline-none transition-colors ${
              activeTab === 'text'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Редактор текста
          </button>
        </div>

        <div className="p-6">
          <TextEditor />
        </div>

        <div className="px-6 py-4 bg-gray-50 text-right">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              setIsAuthenticated(false);
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
