const generateRandomPosition = () => {
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const top = randomInRange(30, 65);
  const left = randomInRange(30, 65);

  const position = {
    top: `${top.toString().slice(0, 6)}%`,
    left: `${left.toString().slice(0, 6)}%`,
  };

  return position;
};

export const generateRandomMarkers = (numMarkers) => {
  const newMarkers = Array.from({ length: numMarkers }, (_, index) => ({
    id: index + 1,
    position: generateRandomPosition(),
  }));
  return newMarkers;
};