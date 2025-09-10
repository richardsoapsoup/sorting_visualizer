import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import BarChart from "./BarChart";
import Controls from "./Controls";
import bubbleSort from "../algorithms/bubbleSort";
import insertionSort from "../algorithms/insertionSort";
import selectionSort from "../algorithms/selectionSort";
import mergeSort from "../algorithms/mergeSort";
import quickSort from "../algorithms/quickSort";
import bucketSort from "../algorithms/bucketSort";
import radixSort from "../algorithms/radixSort";

const algorithms = {
  "Bubble Sort": bubbleSort,
  "Insertion Sort": insertionSort,
  "Selection Sort": selectionSort,
  "Merge Sort": mergeSort,
  "Quick Sort": quickSort,
  "Bucket Sort": bucketSort,
  "Radix Sort": radixSort,
};

const SortingVisualizer = forwardRef((props, ref) => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");

 
  const isSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  const generateArray = (size = 20) => {
    const arr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 50) + 5
    );
    setArray(arr);
  };

  useEffect(() => generateArray(), []);

  const startSort = async () => {
    if (array.length === 0) return;
    if (isSorted(array)) return; 

    const algoFunc = algorithms[selectedAlgo];
    if (!algoFunc) return;

    setIsSorting(true);
    await algoFunc(array, setArray);
    setIsSorting(false);
  };

  useImperativeHandle(ref, () => ({
    startSort,
  }));

  const sorted = isSorted(array);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-4xl bg-gray-800 p-4 rounded mt-4">
        <BarChart array={array} />
      </div>

      <Controls
        onGenerate={() => generateArray(20)}
        onSort={startSort}
        disabled={isSorting}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
        algorithms={algorithms}
        isArraySorted={sorted} 
      />
    </div>
  );
});

export default SortingVisualizer;
