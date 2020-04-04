let lastExec = 0;
let timeout = null;

export const debounce = (f, ms) => {
  if (Date.now() - lastExec < ms && timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(f, ms);
  lastExec = Date.now();
};
