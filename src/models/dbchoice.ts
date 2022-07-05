import { useState } from 'react';

export default () => {
  const [dbchoice, setDBChoice] = useState('DEV');
  const changeDBtoPROD = () => {setDBChoice('PROD')};
  const changeDBtoDEV = () => {setDBChoice('DEV')};
  return { dbchoice, changeDBtoPROD, changeDBtoDEV };
};