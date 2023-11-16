const generateRandomPosition = () => {
  const top = Math.random() * (480 - 160) + 175;
  const left = Math.random() * (310 - 60) + 90; 

  const position = {
    top: top.toString().slice(0, 6),
    left: left.toString().slice(0, 6),
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