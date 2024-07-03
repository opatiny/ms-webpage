import { useEffect, useState } from 'react';

import DistancesPlot from '../components/DistancesPlot';
import { DistancesTable } from '../components/DistancesTable';
import { ImuTable } from '../components/ImuTable';
import OdometryPlot from '../components/OdometryPlot';
import { OdometryTable } from '../components/OdometryTable';

import { getEmptyState, updateState } from './stateUtilities';

export default function Monitoring() {
  const [state, setState] = useState(getEmptyState());

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
        const newState = updateState(state, e.data);

        console.log(newState);
        setState(newState);
      },
      false,
    );
    // Whenever we're done with the data stream we must close the connection
    return () => eventSource.close();
  }, [state]);

  return (
    <div
      style={{
        overflow: 'clip',
      }}
    >
      <h2>Accelerometer data</h2>
      <ImuTable {...state.robot.imu} />
      <h2>Distance sensors</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <DistancesTable {...state} />
        </div>
        <div style={{ flex: 1 }}>
          <DistancesPlot {...state.distancePlot} />
        </div>
      </div>
      <h2>Odometry</h2>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <OdometryTable {...state} />
        </div>
        <div style={{ flex: 1 }}>
          <OdometryPlot {...state} />
        </div>
      </div>
    </div>
  );
}
