import React, { useEffect } from 'react';
import { init } from '@canvas-medical/embed-scheduler';

export const Scheduler = ({ config, patientKey }) => {
  useEffect(() => {
    init({
      ...config,
      patientKey,
    });
  }, []);

  return <div id="embed-root"></div>;
};
