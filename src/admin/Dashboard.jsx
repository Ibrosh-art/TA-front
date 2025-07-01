import { useState } from 'react';
import TextEditor from './TextEditor';
import Auth from './Auth';

// 📦 Пример начальных метрик
const initialMetrics = {
  performance: [
    { metric: "ROI", value: "12%", description: "Return on investment" },
    { metric: "Sharpe Ratio", value: "1.3", description: "Risk-adjusted return" }
  ],
  risk: [
    { metric: "Max Drawdown", value: "-20%", description: "Maximum observed loss" }
  ]
};

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [metrics, setMetrics] = useState(initialMetrics);

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen mt-24 bg-white-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h1 className="text-2xl font-bold text-white">Админ-панель</h1>
        </div>

        {/* Tabs Navigation */}
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

        {/* Tab Content */}
        <div className="p-6">
            <TextEditor />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 text-right">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
