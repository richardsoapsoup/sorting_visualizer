import { playTone } from "../sound";

export default async function selectionSort(arr, setArray) {
  let array = [...arr];
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      playTone(array[j]);
      if (array[j] < array[minIdx]) minIdx = j;
      await delay(30);
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      setArray([...array]);
      playTone(array[i], 120);
    }
  }
}
