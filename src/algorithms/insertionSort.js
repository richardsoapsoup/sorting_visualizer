import { playTone } from "../sound";

export default async function insertionSort(arr, setArray) {
  let array = [...arr];
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      playTone(array[j]);
      array[j + 1] = array[j];
      setArray([...array]);
      j--;
      await delay(60);
    }
    array[j + 1] = key;
    setArray([...array]);
    playTone(key, 120);
    await delay(60);
  }
}
