import { playTone } from "../sound";

export default async function bucketSort(array, setArray, delay) {
  const n = array.length;
  if (n <= 0) return;

  const max = Math.max(...array);
  const bucketCount = Math.floor(Math.sqrt(n));
  const buckets = Array.from({ length: bucketCount }, () => []);

  
  for (let i = 0; i < n; i++) {
    const idx = Math.floor((array[i] / (max + 1)) * bucketCount);
    buckets[idx].push(array[i]);
  }

  
  for (let i = 0; i < bucketCount; i++) {
    for (let j = 1; j < buckets[i].length; j++) {
      let key = buckets[i][j];
      let k = j - 1;
      while (k >= 0 && buckets[i][k] > key) {
        buckets[i][k + 1] = buckets[i][k];
        k--;
      }
      buckets[i][k + 1] = key;
    }
  }

  
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      array[index] = buckets[i][j];
      setArray([...array]);
      playTone(array[index]);
      await new Promise((resolve) => setTimeout(resolve, delay));
      index++;
    }
  }
}
