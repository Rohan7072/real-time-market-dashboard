export const getChange = (current, previous) => {
  if (previous === null || previous === undefined) return 0;
  return +(current - previous).toFixed(2);
};

export const getChangePercent = (current, previous) => {
  if (!previous) return 0;
  return +(((current - previous) / previous) * 100).toFixed(2);
};

export const getColorClass = (value) => {
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600";
  return "text-gray-500";
};
