import { LegendPosition } from 'react-plot';

import {
  getNewAngSpeedData,
  getNewCommandsData,
  getNewDistanceData,
  getNewLinSpeedData,
  getNewOdometryData,
  getNewWheelsSpeedData,
} from '../utilities/updatePlots';

export const MAX_TIME_PLOT_DATA_LENGTH = 100;
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

export type PlotSeries = Point[][];

export interface PlotData {
  series: PlotSeries;
  labels: string[];
}
export interface TimePlotData extends PlotData {
  xLabel?: string;
  yLabel?: string;
  title?: string;
  yLimit?: number;
  legendPosition?: LegendPosition;
  plotWidth?: number;
  plotHeight?: number;
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
  mode: boolean;
}

export interface Controllers {
  v: Controller;
  omega: Controller;
  commands: { left: number; right: number };
}

export interface Robot {
  navigation: { mode: number };
  imu: Imu;
  distances: number[];
  odometry: Odometry;
  controllers: Controllers;
  leftMotor: Motor;
  rightMotor: Motor;
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
  const emptyController: Controller = {
    target: 0,
    current: 0,
    kp: 0,
    ki: 0,
    kd: 0,
    mode: true,
  };

  const state: State = {
    robot: {
      navigation: { mode: 0 },
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
        v: emptyController, // is the same object if we don't use the spread operator
        omega: emptyController,
        commands: { left: 0, right: 0 },
      },
      leftMotor: { command: 0, speed: 0 },
      rightMotor: { command: 0, speed: 0 },
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
      series: getEmptySeries(NB_DISTANCE_SENSORS, MAX_TIME_PLOT_DATA_LENGTH),
      labels: ['Left', 'Front-left', 'Front', 'Front-right', 'Right'],
      xLabel: 'Time [s]',
      yLabel: 'Distance [mm]',
      title: 'Distance sensors',
      yLimit: 1000, // mm
      legendPosition: 'right',
      plotWidth: 800,
    },
    odometryPlot: {
      series: getEmptySeries(1, MAX_TIME_PLOT_DATA_LENGTH),
      labels: ['Position'],
    },
    linearSpeedControllerPlot: {
      series: getEmptySeries(2, MAX_TIME_PLOT_DATA_LENGTH),
      labels: ['Target speed', 'Current speed'],
      xLabel: 'Time [s]',
      yLimit: 0.5,
      yLabel: 'v [m/s]',
      title: 'Linear speed controller',
    },
    angularSpeedControllerPlot: {
      series: getEmptySeries(2, MAX_TIME_PLOT_DATA_LENGTH),
      labels: ['Target speed', 'Current speed'],
      xLabel: 'Time [s]',
      yLabel: 'omega [rad/s]',
      title: 'Angular speed controller',
      yLimit: 5,
    },
    commandsPlot: {
      series: getEmptySeries(2, MAX_TIME_PLOT_DATA_LENGTH),
      labels: ['Left', 'Right'],
      xLabel: 'Time [s]',
      yLabel: 'Command [-]',
      title: 'PWM commands applied to the motors',
      yLimit: 260,
    },
    wheelSpeedsPlot: {
      series: getEmptySeries(2, MAX_TIME_PLOT_DATA_LENGTH),
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
    commandsPlot: getNewCommandsData(previousState, robotState),
    wheelSpeedsPlot: getNewWheelsSpeedData(previousState, robotState),
  };
  return state;
}
