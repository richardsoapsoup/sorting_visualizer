// Controls.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";

export default function Controls({
  onGenerate,
  onSort,
  disabled,
  selectedAlgo,
  setSelectedAlgo,
  algorithms,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref para o container do dropdown (o div "relative w-52")

  const handleSelect = (name) => {
    setSelectedAlgo(name);
    setOpen(false); // Fecha o dropdown ao selecionar um item
  };

  // useCallback para handleClickOutside para evitar recriação desnecessária
  const handleClickOutside = useCallback((event) => {
    // Verifica se o dropdown está aberto e se o clique foi FORA do container do dropdown
    if (open && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  }, [open]); // Depende apenas de 'open'

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // Função de cleanup para remover o listener quando o componente desmontar ou 'open' mudar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]); // A dependência é handleClickOutside, que por sua vez depende de 'open'


  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 bg-gray-800 px-5 py-4 rounded-2xl shadow-xl">
      {/* Este div precisa ser relative para que o ul (absolute) se posicione em relação a ele */}
      <div className="relative w-52" ref={dropdownRef}>
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
          <ul
            className="absolute left-0 w-full max-h-64 overflow-y-auto bg-gray-700 rounded-xl shadow-lg"
            style={{
              top: "100%", // Abre abaixo do botão
              zIndex: 1000, // Valor alto para garantir que fique por cima
            }}
          >
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