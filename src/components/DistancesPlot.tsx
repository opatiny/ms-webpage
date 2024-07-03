import React from 'react';
import { Axis, LineSeries, Plot, Heading, Legend } from 'react-plot';

import { PlotData } from '../demo/stateUtilities';

export default function DistancesPlot(plotData: PlotData) {
  const {
    series,
    labels,
    title = 'My plot',
    xlabel = 'x',
    ylabel = 'y',
    yLimit = 100,
  } = plotData;
  return (
    <Plot
      width={700}
      height={300}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <Legend position="right" />
      <Heading title={title} />

      {series.map((serie, index) => (
        <LineSeries
          displayMarkers
          markerShape="circle"
          markerSize={5}
          key={index}
          data={serie}
          label={labels[index]}
        />
      ))}

      <Axis id="x" position="bottom" label={xlabel} displayPrimaryGridLines />
      <Axis
        id="y"
        position="left"
        label={ylabel}
        displayPrimaryGridLines
        min={-yLimit}
        max={yLimit}
      />
    </Plot>
  );
}
