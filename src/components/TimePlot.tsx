import React from 'react';
import { Axis, LineSeries, Plot, Heading, Legend } from 'react-plot';

import { TimePlotData } from '../demo/stateUtilities';

export default function TimePlot(plotData: TimePlotData) {
  const {
    series,
    labels,
    title = 'My plot',
    xLabel = 'x',
    yLabel = 'y',
    yLimit = 100,
    legendPosition = 'bottom',
    plotHeight = 300,
    plotWidth = 600,
  } = plotData;

  return (
    <Plot
      width={plotWidth}
      height={plotHeight}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <Legend position={legendPosition} />
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
      <Axis id="x" position="bottom" label={xLabel} displayPrimaryGridLines />
      <Axis
        id="y"
        position="left"
        label={yLabel}
        displayPrimaryGridLines
        // min={-yLimit}
        // max={yLimit}
      />
    </Plot>
  );
}
