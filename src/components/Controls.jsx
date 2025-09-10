import { useState } from "react";

export default function Controls({
  onGenerate,
  onSort,
  disabled,
  selectedAlgo,
  setSelectedAlgo,
  algorithms,
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (name) => {
    setSelectedAlgo(name);
    setOpen(false);
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 bg-gray-800 px-5 py-4 rounded-2xl shadow-xl">
    
      <div className="relative w-52">
        <button
          onClick={() => setOpen(!open)}
          disabled={disabled}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-xl shadow-md hover:from-purple-500 hover:to-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium flex justify-between items-center transition-all"
        >
          {selectedAlgo}
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {open && (
          <ul className="absolute mt-1 w-full max-h-64 overflow-y-auto bg-gray-700 rounded-xl shadow-lg z-10">
            {Object.keys(algorithms).map((name) => (
              <li
                key={name}
                onClick={() => handleSelect(name)}
                className="px-4 py-2 hover:bg-purple-600 hover:text-white cursor-pointer transition-colors font-medium"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <button
        onClick={onGenerate}
        disabled={disabled}
        className="px-5 py-2 bg-blue-600 rounded-xl font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      >
        Gerar Lista
      </button>

      
      <button
        onClick={onSort}
        disabled={disabled}
        className="px-5 py-2 bg-green-600 rounded-xl font-semibold shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
      >
        Ordenar
      </button>
    </div>
  );
}
