import { playTone } from "../sound";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function partition(arr, low, high, setArray) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    playTone(arr[j]);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setArray([...arr]);
      await delay(80);
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  setArray([...arr]);
  playTone(arr[i + 1], 120);
  await delay(80);
  return i + 1;
}

async function quickSortHelper(arr, low, high, setArray) {
  if (low < high) {
    let pi = await partition(arr, low, high, setArray);
    await quickSortHelper(arr, low, pi - 1, setArray);
    await quickSortHelper(arr, pi + 1, high, setArray);
  }
}

export default async function quickSort(arr, setArray) {
  let array = [...arr];
  await quickSortHelper(array, 0, array.length - 1, setArray);
}
