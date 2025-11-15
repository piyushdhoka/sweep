import React from 'react';
import { add } from './math';



// Only using add and React, others are unused
export const Calculator: React.FC = () => {
  const result = add(5, 3);
  return <div>{result}</div>;
};