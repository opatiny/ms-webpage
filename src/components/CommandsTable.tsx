import { State } from '../demo/stateUtilities';

const NB_DIGITS = 0;
export function CommandTable(state: State) {
  return (
    <div>
      <table>
        <tr>
          <th align="left"> Wheel </th>
          <th> Command [-]</th>
        </tr>

        <tr>
          <td>Left</td>
          <td align="center">
            {state.robot.leftMotor.command.toFixed(NB_DIGITS)}
          </td>
        </tr>
        <tr>
          <td>Right</td>
          <td align="center">
            {state.robot.rightMotor.command.toFixed(NB_DIGITS)}
          </td>
        </tr>
      </table>
    </div>
  );
}
