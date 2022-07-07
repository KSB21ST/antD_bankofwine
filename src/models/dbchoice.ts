import { message } from 'antd';
import { useState } from 'react';

export default () => {
  const [dbchoice, setDBChoice] = useState('PROD');
  const changeDBtoPROD = () => {
    setDBChoice('PROD');
    message.success('Refresh the table below');
  };
  const changeDBtoDEV = () => {
    setDBChoice('DEV');
    message.success('Refresh the table below');
  };
  return { dbchoice, changeDBtoPROD, changeDBtoDEV };
};
