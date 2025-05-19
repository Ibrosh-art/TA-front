import React from 'react';

const Story = ({ img, username, viewed = false, onClick }) => {
  return (
    <div className="flex flex-col items-center space-y-1 cursor-pointer" onClick={onClick}>
      <div className={`relative bg-white rounded-full p-[1.5px] 
        ${!viewed ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' : 'border border-gray-300 dark:border-gray-600'}`}>
        <div className="bg-white rounded-full p-0.5 dark:bg-gray-800">
          <img
            className="h-14 w-14 rounded-full object-cover border-2 border-white dark:border-gray-800"
            src={img}
            alt={username}
          />
        </div>
      </div>
      <p className="text-xs w-16 truncate text-center text-gray-800 dark:text-gray-200">
        {username}
      </p>
    </div>
  );
};

export default Story;
