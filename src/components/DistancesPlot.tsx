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

import { PlotData } from '../demo/stateUtilities';

export default function DistancesPlot(plotData: PlotData) {
  return (
    <Plot
      width={700}
      height={300}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <Legend position="right" />
      <Heading title="Distance sensors values" />

      {plotData.series.map((serie, index) => (
        <LineSeries
          displayMarkers
          markerShape="circle"
          markerSize={5}
          key={index}
          data={serie}
          label={plotData.labels[index]}
        />
      ))}

      <Axis id="x" position="bottom" label="Time [s]" displayPrimaryGridLines />
      <Axis
        id="y"
        position="left"
        label="Distance [mm]"
        displayPrimaryGridLines
        paddingEnd={1}
        min={-400}
        max={400}
      />
    </Plot>
  );
}
