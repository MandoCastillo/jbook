import React, { FC } from 'react';
import { useActions } from '../hooks/use-actions';

interface ActionBarProps {
  id: string;
}

export const ActionBar: FC<ActionBarProps> = ({id}) => {
  const {moveCell, deleteCell} = useActions();
  return (
    <>
      <button onClick={() => moveCell(id, 'up')}>Up</button>
      <button onClick={() => moveCell(id, 'down')}>Down</button>
      <button onClick={() => deleteCell(id)}>Delete</button>
    </>
  );
};
