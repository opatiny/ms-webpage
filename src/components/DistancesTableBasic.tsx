import { State } from '../demo/stateUtilities';

export function DistancesTableBasic(state: State) {
  const distances = state.robot.distances;
  const labels = state.distancePlot.labels;

  return (
    <div>
      <h1>Distance sensors</h1>
      <table>
        <tr>
          {labels.map((label, index) => (
            <th key={index}>{label}</th>
          ))}
        </tr>
        <tr>
          {distances.map((distance, index) => (
            <td key={index}>{distance}</td>
          ))}
        </tr>
      </table>
    </div>
  );
}
