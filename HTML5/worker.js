let total = 0;
for (let i = 0; i < 1e7; i++) {
  total += i;
}
postMessage(total);
