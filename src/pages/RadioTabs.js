import { useNavigate } from "react-router-dom";

const RadioTabs = () => {
  const navigate = useNavigate();

  const tabs = [
    { name: "Главная", path: "/" },
    { name: "Футбол", path: "/football" },
    { name: "Университет", path: "/university" },
    { name: "Плаза", path: "/plaza" },
  ];

  const handleChange = (path) => {
    navigate(path);
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="radio-inputs w-[350px] bg-white rounded-xl shadow-lg p-1 flex">
        {tabs.map((tab, index) => (
          <div key={index} className="radio flex-1 text-center">
            <input
              type="radio"
              id={`tab-${index}`}
              name="tabs"
              className="hidden"
              onChange={() => handleChange(tab.path)}
            />
            <label htmlFor={`tab-${index}`} className="name block py-2 px-4 cursor-pointer rounded-lg text-slate-800 transition-all duration-200 hover:bg-yellow-100">
              {tab.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioTabs;
