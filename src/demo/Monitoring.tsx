import { useEffect, useState } from 'react';

import { Accelerometer } from '../components/Accelerometer';
import { SVGMaze } from '../components/SVGMaze';

export default function Monitoring() {
  const [robotState, setRobotState] = useState(parseData('{}'));

  useEffect(() => {
    const localDevelopement = false;
    const server = localDevelopement
      ? 'http://192.168.1.193'
      : 'http://172.16.19.247';
    const eventSource = new EventSource(`${server}/events`);

    // Whenever the connection is established between the server and the client we'll get notified
    eventSource.onopen = () => {
      console.log('>>> Connection opened!');
    };
    // Made a mistake, or something bad happened on the server? We get notified here
    eventSource.onerror = (e) => {
      console.log('ERROR!', e);
    };
    // This is where we get the messages. The event is an object and we're interested in its `data` property
    eventSource.onmessage = (e) => {
      console.log('message: ', e.data);
    };

    eventSource.addEventListener(
      'state',
      (e) => {
        const state = parseData(e.data);
        console.log(state);
        setRobotState(state);
      },
      false,
    );
    // Whenever we're done with the data stream we must close the connection
    return () => eventSource.close();
  }, []);

  return (
    <div
      style={{
        border: '1px solid red',
        overflow: 'clip',
      }}
    >
      <SVGMaze {...robotState.maze} />;
      <Accelerometer {...robotState.robot.imu} />
    </div>
  );
}

function parseData(data) {
  const state = JSON.parse(data);

  const robotState = {
    robot: state,
    maze: {
      cellSize: 50,
      cellValues: [
        {
          x: 0,
          y: 0,
          label: 'A',
        },
        {
          x: 1,
          y: 0,
          label: 'B',
        },
        {
          x: 0,
          y: 1,
          label: 'C',
        },
        {
          x: 1,
          y: 1,
          label: 'D',
        },
      ],
    },
  };
  return robotState;
}
