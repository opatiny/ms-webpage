import { Imu } from '../demo/stateUtilities';

const NB_DIGITS = 2;

export function ImuTable(imu: Imu) {
  return (
    <div>
      <table>
        <tr>
          <th>Dimension</th>
          <th>Linear [m/s^2] </th>
          <th>Angular [rad/s]</th>
        </tr>
        <tr>
          <td>x</td>
          <td>{imu.acceleration.x.toFixed(NB_DIGITS)}</td>
          <td>{imu.rotation.x.toFixed(NB_DIGITS)}</td>
        </tr>
        <tr>
          <td>y</td>
          <td>{imu.acceleration.y.toFixed(NB_DIGITS)}</td>
          <td>{imu.rotation.y.toFixed(NB_DIGITS)}</td>
        </tr>
        <tr>
          <td>z</td>
          <td>{imu.acceleration.z.toFixed(NB_DIGITS)}</td>
          <td>{imu.rotation.z.toFixed(NB_DIGITS)}</td>
        </tr>
      </table>
    </div>
  );
}
