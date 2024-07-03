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
export interface TimePlotData extends PlotData {
  xLabel?: string;
  yLabel?: string;
  title?: string;
  yLimit?: number;
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
  time: number;
}

export interface Motor {
  command: number;
  speed: number;
}

export interface Controller {
  current: number;
  target: number;
  kp: number;
  ki: number;
  kd: number;
}

export interface Controllers {
  v: Controller;
  omega: Controller;
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
  distancePlot: TimePlotData;
  odometryPlot: PlotData;
  linearSpeedControllerPlot: TimePlotData;
  angularSpeedControllerPlot: TimePlotData;
  commandsPlot: TimePlotData;
  wheelSpeedsPlot: TimePlotData;
}

export function getEmptyState(): State {
  const emptyControllerPlotBase = {
    series: getEmptySeries(2, MAX_CONTROLLER_DATA_LENGTH),
    labels: ['Target speed', 'Current speed'],
    xLabel: 'Time [s]',
  };
  const emptyController: Controller = {
    target: 0,
    current: 0,
    kp: 0,
    ki: 0,
    kd: 0,
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
        time: 0,
      },
      controllers: {
        v: emptyController,
        omega: emptyController,
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
      xLabel: 'Time [s]',
      yLabel: 'Distance [mm]',
      title: 'Distance sensors',
      yLimit: 1000, // mm
    },
    odometryPlot: {
      series: getEmptySeries(1, MAX_ODOMETRY_DATA_LENGTH),
      labels: ['Position'],
    },
    linearSpeedControllerPlot: {
      ...emptyControllerPlotBase,
      yLabel: 'v [m/s]',
      title: 'Linear speed controller',
      yLimit: 2,
    },
    angularSpeedControllerPlot: {
      ...emptyControllerPlotBase,
      yLabel: 'omega [rad/s]',
      title: 'Angular speed controller',
      yLimit: 30,
    },
    commandsPlot: {
      series: getEmptySeries(2, MAX_CONTROLLER_DATA_LENGTH),
      labels: ['Left', 'Right'],
      xLabel: 'Time [s]',
      yLabel: 'Command [-]',
      title: 'Commands applied to the motors',
      yLimit: 260,
    },
    wheelSpeedsPlot: {
      series: getEmptySeries(2, MAX_CONTROLLER_DATA_LENGTH),
      labels: ['Left', 'Right'],
      xLabel: 'Time [s]',
      yLabel: 'Speed [rpm]',
      title: 'Wheel speeds',
      yLimit: 600,
    },
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
    linearSpeedControllerPlot: getNewLinSpeedData(previousState, robotState),
    angularSpeedControllerPlot: getNewAngSpeedData(previousState, robotState),
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
    ...distancePlot,
    series: newSeries,
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
    ...odometryPlot,
    series: newSeries,
  };
}

function getNewLinSpeedData(previousState: State, newRobot: Robot): PlotData {
  const { linearSpeedControllerPlot } = previousState;
  const { controllers } = newRobot;
  const time = newRobot.odometry.time;

  const data = [
    controllers.v.target,
    controllers.v.current,
    controllers.commands.left,
    controllers.commands.right,
  ];

  const newSeries = getNewPlotData(
    linearSpeedControllerPlot.series,
    time,
    data,
    {
      xFactor: 1e6,
      maxDataLength: MAX_CONTROLLER_DATA_LENGTH,
    },
  );

  return {
    ...linearSpeedControllerPlot,
    series: newSeries,
  };
}

function getNewAngSpeedData(previousState: State, newRobot: Robot): PlotData {
  const { angularSpeedControllerPlot } = previousState;
  const { controllers } = newRobot;
  const time = newRobot.odometry.time;

  const data = [
    controllers.omega.target,
    controllers.omega.current,
    controllers.commands.left,
    controllers.commands.right,
  ];

  const newSeries = getNewPlotData(
    angularSpeedControllerPlot.series,
    time,
    data,
    {
      xFactor: 1e6,
      maxDataLength: MAX_CONTROLLER_DATA_LENGTH,
    },
  );

  return {
    series: newSeries,
    labels: angularSpeedControllerPlot.labels,
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
