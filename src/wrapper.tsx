import React from 'react';

interface Props {
  children: JSX.Element[];
}

function Wrapper({ children }: Props) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return <div style={style}>{children}</div>;
}

export default Wrapper;
