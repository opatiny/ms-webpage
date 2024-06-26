import { getCells } from '../data/getCells';

export function SVGMaze(maze) {
  const { cellSize = 50, cellValues = [] } = maze;

  if (cellValues.length === 0) {
    return;
  }

  const cells = getCells(maze);

  const nbRows = Math.max(...cellValues.map((cellValue) => cellValue.y)) + 1;
  const nbCols = Math.max(...cellValues.map((cellValue) => cellValue.x)) + 1;

  const svgSize = {
    width: cellSize * nbCols,
    height: cellSize * nbRows,
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
      width={svgSize.width}
      height={svgSize.height}
    >
      {cells}
    </svg>
  );
}
