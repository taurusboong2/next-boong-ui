export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export const range = (start: number, end: number, step = 1) => {
  const last = end || start;
  let i = last !== start ? start : 0;
  const arr: number[] = [];

  while (i < last) {
    arr.push(i);
    i += step;
  }
  return arr;
};
