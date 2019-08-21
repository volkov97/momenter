import React, { useState, useEffect } from 'react';

import { Wrap } from './App.styled';

export const App = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setInterval(() => setCounter(counter => counter + 1), 1000);
  }, []);

  return <Wrap>{counter}</Wrap>;
};
