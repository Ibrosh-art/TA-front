import React from 'react';
import './Fac.css';
import { FaCode, FaPalette, FaMedkit, FaChartLine, FaAtom, FaRobot } from 'react-icons/fa';

const FacultiesPage = () => {
  const faculties = [
    {
      id: 1,
      title: "Digital Future",
      subtitle: "IT Faculty",
      description: "Кодинг, AI, кибербезопасность и робототехника будущего",
      icon: <FaCode className="faculty-icon" />,
      color: "#6366f1",
      pattern: "circuit-board"
    },
    {
      id: 2,
      title: "Visual Revolution",
      subtitle: "Design Faculty", 
      description: "Создавайте визуальные миры в цифровую эпоху",
      icon: <FaPalette className="faculty-icon" />,
      color: "#ec4899",
      pattern: "topography"
    },
    {
      id: 3,
      title: "Health Tech",
      subtitle: "Medical Faculty",
      description: "Инновационные медицинские технологии и биотехнологии",
      icon: <FaMedkit className="faculty-icon" />,
      color: "#10b981",
      pattern: "bacteria"
    },
    
    {
      id: 5,
      title: "Quantum Frontiers",
      subtitle: "Physics Faculty",
      description: "Исследование квантовых технологий и наноматериалов",
      icon: <FaAtom className="faculty-icon" />,
      color: "#8b5cf6",
      pattern: "atomic"
    },
    {
      id: 6,
      title: "Smart Systems",
      subtitle: "Robotics Faculty",
      description: "Разработка автономных систем и промышленных роботов",
      icon: <FaRobot className="faculty-icon" />,
      color: "#3b82f6",
      pattern: "grid"
    }
  ];

  return (
    <div className="creative-faculties">
      <header className="creative-header">
        <h1>Shape Your <span>Future</span></h1>
        <p>Выберите направление следующего поколения</p>
      </header>

      <div className="faculties-grid">
        {faculties.map(faculty => (
          <div 
            key={faculty.id}
            className="faculty-card"
            style={{
              '--main-color': faculty.color,
              '--pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(faculty.color)}' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            <div className="card-header">
              {faculty.icon}
              <h2>{faculty.title}</h2>
              <span className="subtitle">{faculty.subtitle}</span>
            </div>
            <p className="card-description">{faculty.description}</p>
            <button className="explore-btn">Исследовать →</button>
            <div className="pattern-overlay"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultiesPage;