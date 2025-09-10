export default function BarChart({ array }) {
  const containerMaxWidth = 400; 
  const minBarWidth = 16; 
  const maxBarWidth = 32; 

  
  const barWidth = Math.max(
    minBarWidth,
    Math.min(maxBarWidth, containerMaxWidth / array.length - 4) 
  );

  return (
    <div className="flex items-end justify-center h-64 w-full mt-4 gap-1">
      {array.map((value, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center transition-all duration-150"
          style={{ flex: `0 0 ${barWidth}px` }} 
        >
          
          <div
            style={{ height: `${value * 5}px` }}
            className="w-full bg-purple-500 rounded-t hover:bg-purple-700 transition-all"
          />
          
          <span className="text-white text-xs mt-1">{value}</span>
        </div>
      ))}
    </div>
  );
}
