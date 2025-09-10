import { playTone } from "../sound";

const delayFunc = (ms) => new Promise((res) => setTimeout(res, ms));

async function countingSort(arr, exp, setArray, delay = 80) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    const idx = Math.floor(arr[i] / exp) % 10;
    output[count[idx] - 1] = arr[i];
    count[idx]--;
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
    if (setArray) {
      setArray([...arr]);
      playTone(arr[i]);
      await delayFunc(delay);
    }
  }
}

export default async function radixSort(arr, setArray, delay = 80) {
  const array = [...arr];
  const max = Math.max(...array);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countingSort(array, exp, setArray, delay);
  }
}
