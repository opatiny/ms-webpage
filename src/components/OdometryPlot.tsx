import React from 'react';
import {
  Axis,
  LineSeries,
  Plot,
  Heading,
  Annotation,
  Annotations,
} from 'react-plot';

import { Pose, PlotData, State } from '../demo/stateUtilities';

const AXIS_LIMIT = 1; // in m
const SEGMENT_LENGTH = 0.1; // in m

export default function OdometryPlot(state: State) {
  const pose: Pose = state.robot.odometry.pose;
  const plotData: PlotData = state.odometryPlot;

  const endX = pose.x + SEGMENT_LENGTH * Math.cos(pose.theta);
  const endY = pose.y + SEGMENT_LENGTH * Math.sin(pose.theta);

  return (
    <Plot
      width={500}
      height={500}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <Heading title="Robot position in xy plane" />

      <LineSeries
        displayMarkers
        markerShape="circle"
        markerSize={3}
        data={plotData.series[0]}
      />

      <Annotations>
        <Annotation.Circle x={pose.x} y={pose.y} r={0.03} color={'green'} />
        <Annotation.Line
          x1={pose.x}
          y1={pose.y}
          x2={endX}
          y2={endY}
          color="blue"
          strokeWidth={3}
        />
      </Annotations>
      <Axis
        id="x"
        position="bottom"
        label="x [m]"
        displayPrimaryGridLines
        min={-AXIS_LIMIT}
        max={AXIS_LIMIT}
      />
      <Axis
        id="y"
        position="left"
        label="y [m]"
        displayPrimaryGridLines
        min={-AXIS_LIMIT}
        max={AXIS_LIMIT}
      />
    </Plot>
  );
}
