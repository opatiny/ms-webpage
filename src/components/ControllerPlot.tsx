import React from 'react';
import { Axis, LineSeries, Plot, Heading, Legend } from 'react-plot';

import { PlotData } from '../demo/stateUtilities';

const AXIS_LIMIT = 2; // in m/s

/**
 * Component for the plot of the 5 distance sensors data.
 * @param plotData - The plot series and labels.
 * @returns The plot component.
 */
export default function LinSpeedControllerPlot(plotData: PlotData) {
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
        displayPrimaryGridLines
        min={-AXIS_LIMIT}
        max={AXIS_LIMIT}
      />
    </Plot>
  );
}
