import { SVGMaze } from '../components/SVGMaze';

const props = {
  cellSize: 50,
  cellValues: [
    {
      x: 0,
      y: 0,
      label: 'A',
    },
    {
      x: 1,
      y: 0,
      label: 'B',
    },
    {
      x: 0,
      y: 1,
      label: 'C',
    },
    {
      x: 1,
      y: 1,
      label: 'D',
    },
  ],
};

export default function Maze() {
  return (
    <div
      style={{
        border: '1px solid red',
        overflow: 'clip',
      }}
    >
      <SVGMaze {...props} />
    </div>
  );
}
