import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Football from "./pages/Football";
import Home from "./pages/Home";
import University from "./pages/University";
import Plaza from "./pages/Plaza";
import '../src/components/Nav.css'

function App() {
  
  return (
    <main className="overflow-x-hidden min-h-screen relative">
      {/* Богатый анимированный фон */}
      <div className="fixed inset-0 -z-10 overflow-hidden ">
        {/* Основные анимированные элементы */}
        {/* Большие круги */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-900 rounded-2xl opacity-20 mix-blend-multiply animate-[float_15s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-900 rounded-2xl opacity-20 mix-blend-multiply animate-[float_18s_ease-in-out_infinite_reverse]"></div>
        
        {/* Средние круги */}
        <div className="absolute top-1/3 right-40 w-48 h-48 bg-blue-900 rounded-2xl opacity-25 mix-blend-multiply animate-[float_12s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 left-40 w-52 h-52 bg-yellow-900 rounded-2xl opacity-25 mix-blend-multiply animate-[float_14s_ease-in-out_infinite_reverse]"></div>
        
        {/* Маленькие круги */}
        <div className="absolute top-1/5 right-1/4 w-24 h-24 bg-blue-900 rounded-2xl opacity-30 mix-blend-multiply animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/5 left-1/4 w-28 h-28 bg-blue-900 rounded-2xl opacity-30 mix-blend-multiply animate-[float_10s_ease-in-out_infinite_reverse]"></div>
        
        {/* Дополнительные элементы */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-blue-900 rounded-2xl opacity-15 mix-blend-multiply animate-[float_7s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-900 rounded-2xl opacity-15 mix-blend-multiply animate-[float_9s_ease-in-out_infinite_reverse]"></div>
        
        {/* Абстрактные формы */}
        <div className="absolute top-2/3 left-1/5 w-40 h-40 bg-blue-900 opacity-20 mix-blend-multiply animate-[float_11s_ease-in-out_infinite] rounded-[40%]"></div>
        <div className="absolute top-1/4 right-1/5 w-36 h-36 bg-blue-900 opacity-20 mix-blend-multiply animate-[float_13s_ease-in-out_infinite_reverse] rounded-[30%]"></div>
        
        {/* Тонкий градиентный слой */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-50 to-yellow-50"></div>
        
        {/* Субтл узор */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 166, 255, 0.64) 0%, transparent 20%),
            radial-gradient(circle at 75% 75%, rgba(224, 176, 19, 0.63) 0%, transparent 20%)
          `,
          backgroundSize: "100% 100%"
        }}></div>
      </div>

      <Router>
        {/* Hero Section */}
        <div className="relative">
          {/* Навбар */}
          <div className="absolute top-0 left-0 w-full z-50 pointer-events-auto">
            <div className="flex items-center justify-between space-x-6 p-4 pr-[50px]">
             <div> <Link to="/">
                <img
                  src="/img/logo.png"
                  alt="logo"
                  className="w-10 rounded-full border border-gray-300 shadow-2xl ml-[25px]"
                />
              </Link></div>
              <div className="nav_menu ml-[500px] flex gap-10"> 
              <Link to="/">
                <p className="Nav_text text-lg font-bold text-white  text-shadow-lg">Dordoi</p>
              </Link>
              <Link to="/football">
                <p className="Nav_text text-lg font-bold text-white  text-shadow-lg">Football</p>
              </Link>
              <Link to="/university">
                <p className="Nav_text text-lg font-bold text-white  text-shadow-lg">University</p>
              </Link>
              <Link to="/plaza">
                <p className="Nav_text text-lg font-bold text-white  text-shadow-lg">Plaza</p>
              </Link></div>
            </div>
          </div>
        </div>
            
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/university" element={<University/>} />
          <Route path="/football" element={<Football />} />
          <Route path="/plaza" element={<Plaza />} />
        </Routes>
      </Router>

      {/* Глобальные стили для анимации */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-20px, -10px) rotate(2deg); }
          40% { transform: translate(20px, -20px) rotate(-3deg); }
          60% { transform: translate(-20px, 20px) rotate(3deg); }
          80% { transform: translate(15px, 10px) rotate(-2deg); }
        }
      `}</style>
    </main>
  );
}

export default App;