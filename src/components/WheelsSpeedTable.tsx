import { State } from '../demo/stateUtilities';

const NB_DIGITS = 0;
export function WheelsSpeedTable(state: State) {
  return (
    <div>
      <table>
        <tr>
          <th align="left"> Wheel </th>
          <th> Speed [rpm]</th>
        </tr>

        <tr>
          <td>Left</td>
          <td align="center">
            {state.robot.leftMotor.speed.toFixed(NB_DIGITS)}
          </td>
        </tr>
        <tr>
          <td>Right</td>
          <td align="center">
            {state.robot.rightMotor.speed.toFixed(NB_DIGITS)}
          </td>
        </tr>
      </table>
    </div>
  );
}
