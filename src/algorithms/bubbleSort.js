import { playTone } from "../sound";

export default async function bubbleSort(arr, setArray) {
  let array = [...arr];
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      playTone(array[j]);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        setArray([...array]);
        playTone(array[j + 1], 120);
      }
      await delay(60);
    }
  }
}

