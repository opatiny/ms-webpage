export function Accelerometer(props) {
  const accelerometer = props.robot.imu;

  return (
    <div>
      <h1>Accelerometer</h1>
      <h2>Linear accelerations</h2>
      <p>X: {accelerometer.acceleration.x}</p>
      <p>Y: {accelerometer.acceleration.y}</p>
      <p>Z: {accelerometer.acceleration.z}</p>
      <h2>Angular accelerations</h2>
      <p>X: {accelerometer.rotation.x}</p>
      <p>Y: {accelerometer.rotation.y}</p>
      <p>Z: {accelerometer.rotation.z}</p>
    </div>
  );
}
