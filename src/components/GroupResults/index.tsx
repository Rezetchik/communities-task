import React from 'react';
import './style.css';

type GroupResults = {
  children: React.ReactNode;
};

function GroupResults({ children }: GroupResults) {
  return <div className="groupsList">{children}</div>;
}

export default React.memo(GroupResults);
