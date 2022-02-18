import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [patientKey, setPatientKey] = useState('');
  const [screen, setScreen] = useState('NONE');

  const config = {
    api: 'http://proxyapplication-env.eba-8mfhdmgm.us-east-1.elasticbeanstalk.com',
    appointmnetCoding: {
      code: '439708006',
    },
    bailoutURL: 'https://viget.com',
    duration: 30,
    locationId: 1,
    patientId: 'd7370b4c04f142abb594b634a8126a91',
    providerIds: [
      'c2ff4546548e46ab8959af887b563eab',
      'fc87cbb2525f4c5eb50294f620c7a15e',
    ],
    description: 'high fever, cough',
    returnURL: 'https://viget.com',
    rootId: 'embed-root',
    brandColor: '#8BC541',
    accentColor: '#0F5096',
  };

  const loginUser = () => {
    axios
      .get(`${config.api}/Auth`, {
        params: {
          key: '8fed9df6-2a51-4570-84bb-42d8b134e37a',
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
            <div>Scheduler</div>
          ) : (
            <div>Appointments</div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
