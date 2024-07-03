import { State } from '../demo/stateUtilities';

export function DistancesTable(state: State) {
  const distances = state.robot.distances;
  const labels = state.distancePlot.labels;

  return (
    <div>
      <table>
        <tr>
          <th align="left"> Sensor </th>
          <th> Distance [mm]</th>
        </tr>

        {distances.map((distance, index) => (
          <tr key={index}>
            <td>{labels[index]}</td>
            <td align="center">{distance}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
