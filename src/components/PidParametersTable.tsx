import { Controller } from '../demo/stateUtilities';

const NB_DIGITS = 3;

export function PidParametersTable(controller: Controller) {
  return (
    <div>
      <table>
        <tr>
          <th align="left"> Parameter </th>
          <th> Value</th>
        </tr>

        <tr>
          <td>k_p</td>
          <td align="center">{controller.kp.toFixed(NB_DIGITS)}</td>
        </tr>
        <tr>
          <td>k_i</td>
          <td align="center">{controller.ki.toFixed(NB_DIGITS)}</td>
        </tr>
        <tr>
          <td>k_d</td>
          <td align="center">{controller.kd.toFixed(NB_DIGITS)}</td>
        </tr>
      </table>
    </div>
  );
}
