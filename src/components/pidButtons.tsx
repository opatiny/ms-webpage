import { ButtonsChoice } from './PidParametersTable';

export interface PidButtons {
  p: ButtonsChoice;
  i: ButtonsChoice;
  d: ButtonsChoice;
  target: ButtonsChoice;
  mode: ButtonsChoice;
}

export const linearPidButtons: PidButtons = {
  p: {
    code: 'BG',
    values: [0, 100, 200, 300],
    labels: ['0', '10', '20', '30'],
    unit: '[-]',
  },
  i: {
    code: 'BH',
    values: [0, 20, 40, 100],
    labels: ['0', '2', '4', '10'],
    unit: '[-]',
  },
  d: {
    code: 'BI',
    values: [0, 10, 50, 100],
    labels: ['0', '1', '5', '10'],
    unit: '[-]',
  },
  target: {
    code: 'R',
    values: [0, 100, 200, 300, 400],
    labels: ['0', '0.1', '0.2', '0.3', '0.4'],
    unit: '[m/s]',
  },
  mode: {
    code: 'BA',
    values: [0, 1],
    labels: ['Off', 'On'],
    unit: '[-]',
  },
};

export const angularPidButtons: PidButtons = {
  p: {
    code: 'BJ',
    values: [0, 100, 300, 1000],
    labels: ['0', '1', '3', '10'],
    unit: '[-]',
  },
  i: {
    code: 'BK',
    values: [0, 10, 20, 100],
    labels: ['0', '0.1', '0.2', '1.0'],
    unit: '[-]',
  },
  d: {
    code: 'BL',
    values: [0, 1, 5, 10],
    labels: ['0', '0.01', '0.05', '0.1'],
    unit: '[-]',
  },
  target: {
    code: 'S',
    values: [0, 45, 90, 180],
    labels: ['0', '45', '90', '180'],
    unit: '[deg/s]',
  },
  mode: {
    code: 'BB',
    values: [0, 1],
    labels: ['Off', 'On'],
    unit: '[-]',
  },
};
