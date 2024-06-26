export function Accelerometer(imu) {
  const {
    acceleration = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
  } = imu;

  return (
    <div>
      <h1>Accelerometer</h1>
      <h2>Linear accelerations</h2>
      <p>X: {acceleration.x}</p>
      <p>Y: {acceleration.y}</p>
      <p>Z: {acceleration.z}</p>
      <h2>Angular accelerations</h2>
      <p>X: {rotation.x}</p>
      <p>Y: {rotation.y}</p>
      <p>Z: {rotation.z}</p>
    </div>
  );
}
