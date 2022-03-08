import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Scheduler } from './scheduler';
import { Appointments } from './appointments';

function App() {
  const [patientKey, setPatientKey] = useState('');
  const [screen, setScreen] = useState('NONE');

  const config = {
    api: 'http://localhost:3000/',
    appointmentCoding: {
      code: '439708006',
    },
    bailoutURL: 'https://canvasmedical.com',
    duration: 30,
    locationId: 1,
    patientId: 'PATIENT_ID',
    providerIds: [
      'PROVIDER_KEY'
    ],
    description: 'high fever, cough',
    returnURL: 'https://canvasmedical.com',
    rootId: 'embed-root',
    brandColor: '#8BC541',
    accentColor: '#0F5096',
  };

  const loginUser = () => {
    axios
      .get(`${config.api}/Auth`, {
        params: {
          key: 'API_KEY',
          patient: config.patientId,
        },
      })
      .then((response) => setPatientKey(response.data.patient_key))
      .catch((e) => console.error(e));
  };

  return (
    <div className="App">
      {!patientKey.length ? (
        <>
          <div className="Brand">
            <h1>Canvas Embed Demo</h1>
          </div>
          <div className="Login">
            <input type="text"></input>
            <input type="password"></input>
            <button onClick={() => loginUser()}>Log In</button>
          </div>
        </>
      ) : (
        <>
          {screen === 'NONE' ? (
            <div>
              <button onClick={() => setScreen('SCHEDULER')}>Scheduler</button>
              <button onClick={() => setScreen('APPOINTMENTS')}>
                Appointments
              </button>
            </div>
          ) : screen === 'SCHEDULER' ? (
            <Scheduler config={config} patientKey={patientKey} />
          ) : (
            <Appointments config={config} patientKey={patientKey} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
