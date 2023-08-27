export default function generateMarks(min, max, step, binary) {
  const marks = [];

  for (let value = min; value <= max; value += step) {
    marks.push({
      label: binary ? Math.pow(2, value) : value.toFixed(1).toString(),
      value: value,
    });
  }

  return marks;
}
