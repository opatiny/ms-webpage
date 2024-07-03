import { State } from '../demo/stateUtilities';

const NB_DIGITS = 3;
export function OdometryTable(state: State) {
  const odometry = state.robot.odometry;

  return (
    <div>
      <table>
        <tr>
          <th align="left"> Variable </th>
          <th> Value</th>
        </tr>

        <tr>
          <td>x [m]</td>
          <td align="center">{odometry.pose.x.toFixed(NB_DIGITS)}</td>
        </tr>
        <tr>
          <td>y [m]</td>
          <td align="center">{odometry.pose.y.toFixed(NB_DIGITS)}</td>
        </tr>
        <tr>
          <td>theta [rad]</td>
          <td align="center">{odometry.pose.theta.toFixed(NB_DIGITS)}</td>
        </tr>
        <tr>
          <td>v [m/s]</td>
          <td align="center">{odometry.speed.v.toFixed(NB_DIGITS)}</td>
        </tr>
        <tr>
          <td>omega [rad/s]</td>
          <td align="center">{odometry.speed.omega.toFixed(NB_DIGITS)}</td>
        </tr>
      </table>
    </div>
  );
}
