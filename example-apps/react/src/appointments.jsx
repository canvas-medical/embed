import React, { useEffect } from 'react';
import { init } from '@canvas-medical/embed-appointments';

export const Appointments = ({ config, patientKey }) => {
  useEffect(() => {
    init({
      ...config,
      patientKey,
    });
  }, []);

  return <div id="embed-root"></div>;
};
