import React from 'react';

interface Props {
  name?: string;
  color: string;
  isSpecial?: boolean;
}

function Hello({ color, name, isSpecial }: Props) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: 'WHO',
};

export default Hello;
