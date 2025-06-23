const tabId = [];

export function getMostFrequentString(arr) {
  const counts = {};
  let maxCount = 0;
  let mostFrequent = null;

  for (const str of arr) {
    counts[str] = (counts[str] || 0) + 1;

    if (counts[str] > maxCount) {
      maxCount = counts[str];
      mostFrequent = str;
    }
  }

  return mostFrequent;
}

console.log(getMostFrequentString(tabId)); // Résultat : "poire"