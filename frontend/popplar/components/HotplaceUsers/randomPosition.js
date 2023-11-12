const generateRandomPosition = () => {
  const topPercent = Math.random() * 65 + 15;
  const leftPercent = Math.random() * 65 + 15;

  const position = {
    top: `${topPercent.toString().slice(0, 6)}%`,
    left: `${leftPercent.toString().slice(0, 6)}%`,
  };
  return position;
};

export const generateRandomMarkers = (numMarkers) => {
  const newMarkers = Array.from({ length: numMarkers }, (_, index) => ({
    id: index + 1,
    position: generateRandomPosition(),
  }));
  return newMarkers
};

// generateRandomMarkers(5);