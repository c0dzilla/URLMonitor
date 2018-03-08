function Percentile () {};

Percentile.calculate = (data, k) => {
  data.sort();
  // percentile logic
  const index = parseInt((k/100)*data.length + 0.5);
  return data[index];
}

module.exports = Percentile;