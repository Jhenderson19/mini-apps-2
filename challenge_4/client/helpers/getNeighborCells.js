export default (l = {x: 0, y: 0}, width, height) => {
  const inRange = (p, w) => {return p >= 0 && p < w};
  const neigbors = [];
  for(let i = -1; i <= 1; i++) {
    for(let j = -1; j <= 1; j++) {
      if(inRange(l.x + i, width) && inRange(l.y + j, height)) {
        neigbors.push({x: l.x + i, y: l.y+ j});
      }
    }
  }
  return neigbors;
}