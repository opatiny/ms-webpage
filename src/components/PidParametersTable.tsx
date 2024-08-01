import { Command } from '../demo/Monitoring';
import { Controller } from '../demo/stateUtilities';

import { PidButtons } from './pidButtons';

const NB_DIGITS = 3;

export interface ButtonsChoice {
  code: string;
  values: number[];
  labels: string[];
  unit: string;
}

export function PidParametersTable(props: {
  controller: Controller;
  buttons: PidButtons;
}) {
  const { controller, buttons } = props;
  return (
    <div>
      <table>
        <tr>
          <th align="left"> Parameter </th>
          <th> Value</th>
          <th> Set value</th>
        </tr>

        <tr>
          <td>k_p</td>
          <td align="center">{controller.kp.toFixed(NB_DIGITS)}</td>
          <td align="left">{printButtons(buttons.p)}</td>
        </tr>
        <tr>
          <td>k_i</td>
          <td align="center">{controller.ki.toFixed(NB_DIGITS)}</td>
          <td align="left">{printButtons(buttons.i)}</td>
        </tr>
        <tr>
          <td>k_d</td>
          <td align="center">{controller.kd.toFixed(NB_DIGITS)}</td>
          <td align="left">{printButtons(buttons.d)}</td>
        </tr>
        <tr>
          <td>Target value</td>
          <td align="center">{controller.target.toFixed(NB_DIGITS)}</td>
          <td align="left">{printButtons(buttons.target)}</td>
        </tr>
        <tr>
          <td>Current value</td>
          <td align="center">{controller.current.toFixed(NB_DIGITS)}</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td align="center">{controller.mode ? 'Enabled' : 'Disabled'}</td>
          <td align="left">{printButtons(buttons.mode)}</td>
        </tr>
      </table>
    </div>
  );
}

function printButtons(buttons: ButtonsChoice) {
  return buttons.values.map((value, index) => (
    <Command
      key={index}
      command={`${buttons.code}${value}`}
      label={buttons.labels[index]}
    />
  ));
}
