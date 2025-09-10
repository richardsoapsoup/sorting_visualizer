import { useState, useRef } from "react";
import SortingVisualizer from "./components/SortingVisualizer";

export default function App() {
  const [visualizers, setVisualizers] = useState([{ id: 0, visible: true }]);
  const visualizerRefs = useRef({});

  const addVisualizer = () => {
    const nextId =
      visualizers.length > 0
        ? visualizers[visualizers.length - 1].id + 1
        : 0;
    setVisualizers((prev) => [...prev, { id: nextId, visible: true }]);
  };

  const removeVisualizer = (id) => {
    
    setVisualizers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, visible: false } : v))
    );

    setTimeout(() => {
      setVisualizers((prev) => prev.filter((v) => v.id !== id));
      delete visualizerRefs.current[id];
    }, 300);
  };

  const sortAll = async () => {
    
    const promises = Object.values(visualizerRefs.current).map((ref) => {
      if (ref?.startSort) return ref.startSort();
      return Promise.resolve();
    });
    await Promise.all(promises);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-7xl px-4">
        
        <button
          onClick={addVisualizer}
          className="text-2xl w-10 h-10 flex justify-center items-center bg-green-600 rounded-full hover:bg-green-700 transition-all shadow-md"
          title="Adicionar novo visualizador"
        >
          +
        </button>

        
        <h1 className="text-3xl font-bold text-center">🔮 Sorting Visualizer</h1>

        
        <button
          onClick={sortAll}
          className="px-4 py-2 bg-purple-600 rounded-xl font-semibold shadow-md hover:bg-purple-700 transition-all"
        >
          Ordenar Todos
        </button>
      </div>

      
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl px-4">
        {visualizers.map((v) => (
          <div
            key={v.id}
            className={`relative transition-all duration-300 ${
              v.visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ minWidth: "250px", maxWidth: "400px", flexGrow: 0 }}
          >
            
            <button
              onClick={() => removeVisualizer(v.id)}
              className="absolute top-2 right-2 w-8 h-8 flex justify-center items-center bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md text-lg"
              title="Remover visualizador"
            >
              –
            </button>

            <SortingVisualizer
              ref={(ref) => (visualizerRefs.current[v.id] = ref)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
