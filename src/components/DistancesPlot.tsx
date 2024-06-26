import React from 'react';
import { Axis, LineSeries, Plot, Heading, Legend } from 'react-plot';

import { PlotData } from '../demo/stateUtilities';

const AXIS_LIMIT = 1000; // in mm

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
        min={-AXIS_LIMIT}
        max={AXIS_LIMIT}
      />
    </Plot>
  );
}
