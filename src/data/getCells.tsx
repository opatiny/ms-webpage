import { Rectangle } from '../components/Rectangle';

export function getCells(props) {
  const { cellValues, cellSize } = props;

  const cells: any[] = [];
  for (const cellValue of cellValues) {
    cells.push(
      <g
        key={`${cellValue.x}-${cellValue.y}`}
        transform={`translate(${cellValue.x * cellSize} ${cellValue.y * cellSize})`}
      >
        <Rectangle
          width={cellSize}
          height={cellSize}
          style={{ fill: 'white', stroke: 'black', strokeWidth: 4 }}
        />
        <text
          x={cellSize / 2}
          y={cellSize / 2}
          style={{ dominantBaseline: 'middle', textAnchor: 'middle' }}
        >
          {cellValue.label}
        </text>
        <line
          x1={0}
          y1={0}
          x2={cellSize}
          y2={cellSize}
          style={{ stroke: 'red', strokeWidth: 2, opacity: 0.3 }}
        />
      </g>,
    );
  }

  return cells;
}
