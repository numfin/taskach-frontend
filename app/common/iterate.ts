export function* iterate(times: number) {
  let iterated = 0;
  while (iterated < times) {
    yield iterated++;
  }
  return iterated;
}

export function iterateArr(times: number) {
  return Array.from(iterate(times));
}
