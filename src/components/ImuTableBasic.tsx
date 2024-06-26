import { Imu } from '../demo/stateUtilities';

export function ImuTableBasic(imu: Imu) {
  return (
    <div>
      <h1>Accelerometer data</h1>
      <table>
        <tr>
          <th>Dimension</th>
          <th>Linear </th>
          <th>Angular</th>
        </tr>
        <tr>
          <td>x</td>
          <td>{imu.acceleration.x}</td>
          <td>{imu.rotation.x}</td>
        </tr>
        <tr>
          <td>y</td>
          <td>{imu.acceleration.y}</td>
          <td>{imu.rotation.y}</td>
        </tr>
        <tr>
          <td>z</td>
          <td>{imu.acceleration.z}</td>
          <td>{imu.rotation.z}</td>
        </tr>
      </table>
    </div>
  );
}
