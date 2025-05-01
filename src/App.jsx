import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Football from "./pages/Football";
import Home from "./pages/Home";
import University from "./pages/University";
import Plaza from "./pages/Plaza";
import '../src/components/Nav.css'

function App() {
  
  return (
    <main className="overflow-x-hidden min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Large Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-900 rounded-full opacity-20 mix-blend-multiply animate-[float_15s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-900 rounded-full opacity-20 mix-blend-multiply animate-[float_18s_ease-in-out_infinite_reverse]"></div>

        {/* Medium Circles */}
        <div className="absolute top-1/3 right-40 w-48 h-48 bg-blue-900 rounded-full opacity-25 mix-blend-multiply animate-[float_12s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 left-40 w-52 h-52 bg-yellow-900 rounded-full opacity-25 mix-blend-multiply animate-[float_14s_ease-in-out_infinite_reverse]"></div>

        {/* Small Circles */}
        <div className="absolute top-1/5 right-1/4 w-24 h-24 bg-blue-900 rounded-full opacity-30 mix-blend-multiply animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/5 left-1/4 w-28 h-28 bg-blue-900 rounded-full opacity-30 mix-blend-multiply animate-[float_10s_ease-in-out_infinite_reverse]"></div>

        {/* Abstract Shapes */}
        <div className="absolute top-2/3 left-1/5 w-40 h-40 bg-blue-900 opacity-20 mix-blend-multiply animate-[float_11s_ease-in-out_infinite] rounded-[40%]"></div>
        <div className="absolute top-1/4 right-1/5 w-36 h-36 bg-blue-900 opacity-20 mix-blend-multiply animate-[float_13s_ease-in-out_infinite_reverse] rounded-[30%]"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-50 to-yellow-50"></div>
      </div>

      <Router>
        {/* Header */}
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <Link to="/" className="flex items-center">
              <img
                src="/img/logo.png"
                alt="logo"
                className="w-12 h-12 rounded-full bg-black"
              />
              <span className="ml-3 text-xl font-bold text-gray-800">Dordoi</span>
            </Link>
            <nav className="flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link to="/football" className="text-gray-700 hover:text-blue-600 font-medium">
                Football
              </Link>
              <Link to="/university" className="text-gray-700 hover:text-blue-600 font-medium">
                University
              </Link>
              <Link to="/plaza" className="text-gray-700 hover:text-blue-600 font-medium">
                Plaza
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/university" element={<University />} />
            <Route path="/football" element={<Football />} />
            <Route path="/plaza" element={<Plaza />} />
          </Routes>
        </div>
      </Router>

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