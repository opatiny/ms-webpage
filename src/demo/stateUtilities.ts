const MAX_DISTANCES_DATA_LENGTH = 100;
export const NB_DISTANCE_SENSORS = 5;

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

export interface Robot {
  imu: Imu;
  distances: number[];
  odometry: Odometry;
}

export interface State {
  robot: Robot;
  maze: Maze;
  distancePlot: PlotData;
}

export function getEmptyState(): State {
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
  };
  return state;
}

function getNewDistanceData(previousState: State, newRobot: Robot): PlotData {
  const { distancePlot } = previousState;
  const { distances } = newRobot;
  const time = newRobot.odometry.time;

  const newSeries = getNewPlotData(distancePlot.series, time, distances);

  return {
    series: newSeries,
    labels: distancePlot.labels,
  };
}

function getNewPlotData(
  previousSeries: PlotSeries,
  time: number,
  newData: number[],
): PlotSeries {
  const newSeries: PlotSeries = previousSeries;

  for (let i = 0; i < NB_DISTANCE_SENSORS; i++) {
    let newValue = newData[i];
    if (i > 2) {
      newValue = -newData[i];
    }
    newSeries[i] = [...newSeries[i], { x: time / 1e6, y: newValue }].slice(
      1,
      MAX_DISTANCES_DATA_LENGTH + 1,
    );
  }

  return newSeries;
}
