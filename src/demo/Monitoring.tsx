import { useEffect, useState } from 'react';

import { CommandTable } from '../components/CommandsTable';
import { DistancesTable } from '../components/DistancesTable';
import { ImuTable } from '../components/ImuTable';
import OdometryPlot from '../components/OdometryPlot';
import { OdometryTable } from '../components/OdometryTable';
import { PidParametersTable } from '../components/PidParametersTable';
import { RobotModesTable, robotModes } from '../components/RobotModesTable';
import TimePlot from '../components/TimePlot';
import { WheelsSpeedTable } from '../components/WheelsSpeedTable';
import { angularPidButtons, linearPidButtons } from '../components/pidButtons';

import { getEmptyState, updateState } from './stateUtilities';

const localDevelopement = false;
const server = localDevelopement
  ? 'http://192.168.1.193'
  : 'http://172.16.19.247';

export default function Monitoring() {
  const [state, setState] = useState(getEmptyState());

  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const eventSource = new EventSource(`${server}/events`);

    // Whenever the connection is established between the server and the client we'll get notified
    eventSource.onopen = () => {
      // console.log('>>> Connection opened!');
    };
    // Made a mistake, or something bad happened on the server? We get notified here
    eventSource.onerror = (e) => {
      console.log('ERROR!', e);
    };
    // This is where we get the messages. The event is an object and we're interested in its `data` property
    eventSource.onmessage = (e) => {
      // console.log('message: ', e.data);
    };

    eventSource.addEventListener(
      'state',
      (e) => {
        const newState = updateState(state, e.data);

        // console.log(newState);
        setState(newState);
      },
      false,
    );
    // Whenever we're done with the data stream we must close the connection
    return () => eventSource.close();
  }, [state, server]);

  return (
    <div
      style={{
        overflow: 'clip',
      }}
    >
      <div>
        Command:
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={async (event) => {
            if (event.key === 'Enter') {
              await sendCommand(server, inputValue, setResponse);
            }
          }}
        />
        <button onClick={() => sendCommand(server, inputValue, setResponse)}>
          Send
        </button>
        <Command command="h" label="Help" setResponse={setResponse} />
        <Command command="ps" label="State" setResponse={setResponse} />
        <Command command="s" label="Settings" setResponse={setResponse} />
      </div>
      <div>
        <textarea cols={100} rows={10} value={response} />
      </div>
      <h2>Accelerometer data</h2>
      <ImuTable {...state.robot.imu} />
      <h2>Distance sensors</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <DistancesTable {...state} />
        </div>
        <div style={{ flex: 1 }}>
          <TimePlot {...state.distancePlot} />
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
      <h2>Robot control mode (T)</h2>
      <div>Current robot mode: {robotModes[state.robot.navigation.mode]}</div>
      <RobotModesTable />
      <h2>Robot speed controllers</h2>
      <h3>Linear speed</h3>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <PidParametersTable
            controller={state.robot.controllers.v}
            buttons={linearPidButtons}
          />
        </div>
        <div style={{ flex: 1 }}>
          <TimePlot {...state.linearSpeedControllerPlot} />
        </div>
      </div>
      <h3>Angular speed</h3>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <PidParametersTable
            controller={state.robot.controllers.omega}
            buttons={angularPidButtons}
          />
        </div>
        <div style={{ flex: 1 }}>
          <TimePlot {...state.angularSpeedControllerPlot} />
        </div>
      </div>
      <h2>Motors PWM commands</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <CommandTable {...state} />
        </div>
        <div style={{ flex: 1 }}>
          <TimePlot {...state.commandsPlot} />
        </div>
      </div>
      <h2>Wheels speed</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <WheelsSpeedTable {...state} />
        </div>
        <div style={{ flex: 1 }}>
          <TimePlot {...state.wheelSpeedsPlot} />
        </div>
      </div>
    </div>
  );
}

async function sendCommand(server, value, setResponse) {
  const response = await fetch(`${server}/command?value=${value}`);
  const text = await response.text();
  setResponse?.(text);
}

export function Command(props) {
  const { command, label, setResponse } = props;
  return (
    <button onClick={() => sendCommand(server, command, setResponse)}>
      {label || command}
    </button>
  );
}
