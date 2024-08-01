import { Command } from '../demo/Monitoring';

export function RobotModesTable() {
  return (
    <div>
      <table>
        <tr>
          <th align="left"> Select mode </th>
          <th align="left"> Set speeds and other params</th>
          <th align="left">Unit</th>
          <th align="center">Serial param</th>
        </tr>

        <tr>
          <td align="left">
            <Command command={`T0`} label={'Stop'} />
          </td>
        </tr>

        <tr>
          <td align="left">
            <Command command={`T1`} label={'Same PWM'} />
          </td>
          <td align="left">
            <Command command={`P0`} label="0" />
            <Command command={`P50`} label="50" />
            <Command command={`P100`} label="100" />
            <Command command={`P150`} label="150" />
          </td>
          <td align="left">[-]</td>
          <td align="center">P</td>
        </tr>

        <tr>
          <td align="left">
            <Command command={`T8`} label={'Wheels speed control'} />
          </td>
          <td align="left">
            <Command command={`Q0`} label="0" />
            <Command command={`Q100`} label="100" />
            <Command command={`Q300`} label="300" />
            <Command command={`Q500`} label="500" />
          </td>
          <td align="left">[rpm]</td>
          <td align="center">Q</td>
        </tr>

        <tr>
          <td align="left">
            <Command command={`T9`} label={'Robot speed control'} />
          </td>
          <td align="left">
            <Command command={`R0`} label="0" />
            <Command command={`R100`} label="0.1" />
            <Command command={`R300`} label="0.3" />
            <Command command={`R500`} label="0.5" />
            <br />
            <Command command={`S0`} label="0" />
            <Command command={`S45`} label="45" />
            <Command command={`S90`} label="90" />
            <Command command={`S180`} label="180" />
          </td>
          <td align="left">
            [m/s]
            <br />
            [deg/s]
          </td>
          <td align="center">
            R<br />S
          </td>
        </tr>

        <tr>
          <td align="left">
            <Command command={`T6`} label={'Stop when obstacle'} />
          </td>
          <td align="left">
            <Command command={`Q0`} label="0" />
            <Command command={`Q100`} label="100" />
            <Command command={`Q300`} label="300" />
            <Command command={`Q500`} label="500" />
            <br />
            <Command command={`V0`} label="0" />
            <Command command={`100`} label="100" />
            <Command command={`V200`} label="200" />
            <Command command={`V300`} label="300" />
          </td>
          <td align="left">
            [rpm]
            <br />
            [mm]
          </td>
          <td align="center">
            Q<br />V (distance)
          </td>
        </tr>
      </table>
    </div>
  );
}
