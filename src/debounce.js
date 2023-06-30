export const debounce = (func, delay) => {
  let timer;

  if (timer) clearTimeout(timer);

  return function (...args) {
    timer = setTimeout(() => {
      func(args);
    }, delay);
  };
};
