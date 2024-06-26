import React from 'react';
import {
  Annotations,
  Axis,
  LineSeries,
  Plot,
  Heading,
  Legend,
} from 'react-plot';
import { Line } from 'react-plot/lib-esm/components/Annotations/Line';

const labels = ['Left', 'Front-left', 'Front', 'Front-right', 'Right'];

export default function DistancesPlot() {
  return (
    <Plot
      width={500}
      height={300}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <Legend />
      <Heading title="Distance sensors values" />
      <LineSeries
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 5 },
          { x: 3, y: 1 },
          { x: 4, y: 8 },
          { x: 5, y: 3 },
        ]}
        label="Left"
      />

      <LineSeries
        data={[
          { x: 0, y: 3 },
          { x: 2, y: 7 },
          { x: 4, y: 1 },
          { x: 6, y: 8 },
          { x: 8, y: 3 },
        ]}
        label="Front-left"
      />
      <Axis id="x" position="bottom" label="Time [s]" displayPrimaryGridLines />
      <Axis
        id="y"
        position="left"
        label="Distance [mm]"
        displayPrimaryGridLines
        paddingEnd={0.5}
      />
      <Annotations>
        <Line x1={2} y1={3} x2={6} y2={5} />
      </Annotations>
    </Plot>
  );
}
