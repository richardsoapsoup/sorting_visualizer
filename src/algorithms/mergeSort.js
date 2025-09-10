import { playTone } from "../sound";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function merge(arr, l, m, r, setArray) {
  let n1 = m - l + 1;
  let n2 = r - m;

  let L = arr.slice(l, m + 1);
  let R = arr.slice(m + 1, r + 1);

  let i = 0,
    j = 0,
    k = l;

  while (i < n1 && j < n2) {
    playTone(arr[k]);
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    setArray([...arr]);
    await delay(80);
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    setArray([...arr]);
    playTone(arr[k]);
    await delay(80);
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    setArray([...arr]);
    playTone(arr[k]);
    await delay(80);
    j++;
    k++;
  }
}

async function mergeSortHelper(arr, l, r, setArray) {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);
  await mergeSortHelper(arr, l, m, setArray);
  await mergeSortHelper(arr, m + 1, r, setArray);
  await merge(arr, l, m, r, setArray);
}

export default async function mergeSort(arr, setArray) {
  let array = [...arr];
  await mergeSortHelper(array, 0, array.length - 1, setArray);
}
