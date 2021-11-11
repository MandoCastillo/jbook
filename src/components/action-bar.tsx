import '../assets/css/action-bar.css'
import React, { FC } from 'react';
import { useActions } from '../hooks/use-actions';

interface ActionBarProps {
  id: string;
}

export const ActionBar: FC<ActionBarProps> = ({id}) => {
  const {moveCell, deleteCell} = useActions();
  return (
    <div className="action-bar">
      <button className="button is-small is-primary" onClick={() => moveCell(id, 'up')}>
        <span className="icon">
          <i className="fas fa-arrow-up"/>
        </span>
      </button>

      <button className="button is-small is-primary" onClick={() => moveCell(id, 'down')}>
        <span className="icon">
          <i className="fas fa-arrow-down"/>
        </span>
      </button>

      <button className="button is-small is-primary" onClick={() => deleteCell(id)}>
        <span className="icon">
          <i className="fas fa-times"/>
        </span>
      </button>
    </div>
  );
};
