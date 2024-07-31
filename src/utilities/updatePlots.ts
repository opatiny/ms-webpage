import {
  PlotData,
  Robot,
  MAX_TIME_PLOT_DATA_LENGTH,
  State,
  PlotSeries,
} from '../demo/stateUtilities';

const TIME_FACTOR = 1e6;

export function getNewDistanceData(
  previousState: State,
  newRobot: Robot,
): PlotData {
  const { distancePlot } = previousState;
  const { distances } = newRobot;
  const time = newRobot.odometry.time;

  const newSeries = getNewPlotData(distancePlot.series, time, distances, {
    xFactor: TIME_FACTOR,
    maxDataLength: MAX_TIME_PLOT_DATA_LENGTH,
  });

  return {
    ...distancePlot,
    series: newSeries,
  };
}

export function getNewOdometryData(
  previousState: State,
  newRobot: Robot,
): PlotData {
  const { odometryPlot } = previousState;
  const { odometry } = newRobot;

  const newSeries = getNewPlotData(
    odometryPlot.series,
    odometry.pose.x,
    [odometry.pose.y],
    { maxDataLength: MAX_TIME_PLOT_DATA_LENGTH },
  );

  return {
    ...odometryPlot,
    series: newSeries,
  };
}

export function getNewLinSpeedData(
  previousState: State,
  newRobot: Robot,
): PlotData {
  const { linearSpeedControllerPlot } = previousState;
  const { controllers } = newRobot;
  const time = newRobot.odometry.time;

  const data = [controllers.v.target, controllers.v.current];

  const newSeries = getNewPlotData(
    linearSpeedControllerPlot.series,
    time,
    data,
    {
      xFactor: TIME_FACTOR,
      maxDataLength: MAX_TIME_PLOT_DATA_LENGTH,
    },
  );

  return {
    ...linearSpeedControllerPlot,
    series: newSeries,
  };
}

export function getNewAngSpeedData(
  previousState: State,
  newRobot: Robot,
): PlotData {
  const { angularSpeedControllerPlot } = previousState;
  const { controllers } = newRobot;
  const time = newRobot.odometry.time;

  const data = [controllers.omega.target, controllers.omega.current];

  const newSeries = getNewPlotData(
    angularSpeedControllerPlot.series,
    time,
    data,
    {
      xFactor: TIME_FACTOR,
      maxDataLength: MAX_TIME_PLOT_DATA_LENGTH,
    },
  );

  return {
    ...angularSpeedControllerPlot,
    series: newSeries,
  };
}

export function getNewCommandsData(
  previousState: State,
  newRobot: Robot,
): PlotData {
  const { commandsPlot } = previousState;
  const { leftMotor, rightMotor } = newRobot;
  const time = newRobot.odometry.time;

  const data = [leftMotor.command, rightMotor.command];

  const newSeries = getNewPlotData(commandsPlot.series, time, data, {
    xFactor: TIME_FACTOR,
    maxDataLength: MAX_TIME_PLOT_DATA_LENGTH,
  });

  return {
    ...commandsPlot,
    series: newSeries,
  };
}

export function getNewWheelsSpeedData(
  previousState: State,
  newRobot: Robot,
): PlotData {
  const { wheelSpeedsPlot } = previousState;
  const { leftMotor, rightMotor } = newRobot;
  const time = newRobot.odometry.time;

  const data = [leftMotor.speed, rightMotor.speed];

  const newSeries = getNewPlotData(wheelSpeedsPlot.series, time, data, {
    xFactor: TIME_FACTOR,
    maxDataLength: MAX_TIME_PLOT_DATA_LENGTH,
  });

  return {
    ...wheelSpeedsPlot,
    series: newSeries,
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
export function getNewPlotData(
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
