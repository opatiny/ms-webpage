const MAX_DISTANCES_DATA_LENGTH = 100;
export const NB_DISTANCE_SENSORS = 5;

const MAX_ODOMETRY_DATA_LENGTH = 100;
const MAX_CONTROLLER_DATA_LENGTH = 100;

export interface Point {
  x: number;
  y: number;
}

export interface MazeCell extends Point {
  label: string;
}

export interface Maze {
  cellSize: number;
  cellValues: MazeCell[];
}

type PlotSeries = Point[][];

export interface PlotData {
  series: PlotSeries;
  labels: string[];
}

export interface XyzData {
  x: number;
  y: number;
  z: number;
}

export interface Imu {
  acceleration: XyzData;
  rotation: XyzData;
}

export interface Pose {
  x: number;
  y: number;
  theta: number;
}

export interface Speed {
  v: number;
  omega: number;
}

export interface Odometry {
  pose: Pose;
  speed: Speed;
  time: number;
}

export interface Controllers {
  targets: Speed;
  commands: { left: number; right: number };
}

export interface Robot {
  imu: Imu;
  distances: number[];
  odometry: Odometry;
  controllers: Controllers;
}

export interface State {
  robot: Robot;
  maze: Maze;
  distancePlot: PlotData;
  odometryPlot: PlotData;
  linearSpeedControllerPlot: PlotData;
  angularSpeedControllerPlot: PlotData;
}

export function getEmptyState(): State {
  const emptyControllerPlot = {
    series: getEmptySeries(4, MAX_CONTROLLER_DATA_LENGTH),
    labels: ['Target speed', 'Current speed', 'Left command', 'Right command'],
  };

  const state: State = {
    robot: {
      imu: {
        acceleration: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      distances: new Array(NB_DISTANCE_SENSORS).fill(0),
      odometry: {
        pose: { x: 0, y: 0, theta: 0 },
        speed: { v: 0, omega: 0 },
        time: 0,
      },
      controllers: {
        targets: { v: 0, omega: 0 },
        commands: { left: 0, right: 0 },
      },
    },
    maze: {
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
    },
    distancePlot: {
      series: getEmptySeries(NB_DISTANCE_SENSORS, MAX_DISTANCES_DATA_LENGTH),
      labels: ['Left', 'Front-left', 'Front', 'Front-right', 'Right'],
    },
    odometryPlot: {
      series: getEmptySeries(1, MAX_ODOMETRY_DATA_LENGTH),
      labels: ['Position'],
    },
    linearSpeedControllerPlot: emptyControllerPlot,
    angularSpeedControllerPlot: emptyControllerPlot,
  };

  return state;
}

function getEmptySeries(nbSeries, nbPoints): PlotSeries {
  return new Array(nbSeries)
    .fill(0)
    .map(() => new Array(nbPoints).fill({ x: 0, y: 0 }));
}

export function updateState(previousState: State, messageString: string) {
  const robotState = JSON.parse(messageString);

  const state: State = {
    robot: robotState,
    maze: previousState.maze,
    distancePlot: getNewDistanceData(previousState, robotState),
    odometryPlot: getNewOdometryData(previousState, robotState),
  };
  return state;
}

function getNewDistanceData(previousState: State, newRobot: Robot): PlotData {
  const { distancePlot } = previousState;
  const { distances } = newRobot;
  const time = newRobot.odometry.time;

  const newSeries = getNewPlotData(distancePlot.series, time, distances, {
    xFactor: 1e6,
    maxDataLength: MAX_DISTANCES_DATA_LENGTH,
  });

  return {
    series: newSeries,
    labels: distancePlot.labels,
  };
}

function getNewOdometryData(previousState: State, newRobot: Robot): PlotData {
  const { odometryPlot } = previousState;
  const { odometry } = newRobot;

  const newSeries = getNewPlotData(
    odometryPlot.series,
    odometry.pose.x,
    [odometry.pose.y],
    { maxDataLength: MAX_ODOMETRY_DATA_LENGTH },
  );

  return {
    series: newSeries,
    labels: odometryPlot.labels,
  };
}

function getNewLinSpeedData(previousState: State, newRobot: Robot): PlotData {
  const { linearSpeedControllerPlot } = previousState;
  newRo;
  const { c } = newRobot;
  const time = newRobot.odometry.time;

  const newSeries = getNewPlotData(
    linearSpeedControllerPlot.series,
    time,
    distances,
    {
      xFactor: 1e6,
      maxDataLength: MAX_CONTROLLER_DATA_LENGTH,
    },
  );

  return {
    series: newSeries,
    labels: distancePlot.labels,
  };
}

interface NewDataOptions {
  /**
   * Factor by which to divide the x data.
   */
  xFactor?: number;
  /**
   * Factor by which to divide the y data.
   */
  yFactor?: number;
  /**
   * We slice the arrays to keep only the last `maxDataLength` elements.
   */
  maxDataLength?: number;
}

/**
 * Update the plot data by adding a new measurement.
 * @param previousSeries - The previous plot data.
 * @param xData - The new x value.
 * @param yData - The new y values.
 * @param options - The data options
 * @returns The new plot data.
 */
function getNewPlotData(
  previousSeries: PlotSeries,
  xData: number,
  yData: number[],
  options: NewDataOptions = {},
): PlotSeries {
  const { xFactor = 1, yFactor = 1, maxDataLength = 100 } = options;

  const newSeries: PlotSeries = previousSeries;

  const nbSeries = newSeries.length;

  for (let i = 0; i < nbSeries; i++) {
    let newValue = yData[i];
    if (i > 2) {
      newValue = -yData[i];
    }
    newSeries[i] = [
      ...newSeries[i],
      { x: xData / xFactor, y: newValue / yFactor },
    ].slice(1, maxDataLength + 1);
  }

  return newSeries;
}
