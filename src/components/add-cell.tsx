import '../assets/css/add-cell.css';
import React, { FC } from 'react';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  nextCellId: string | null;
}

export const AddCell: FC<AddCellProps> = ({nextCellId}) => {
  const {insertCellBefore} = useActions();
  return (
    <div className="add-cell">
      <div className="add-buttons">
        <button
          className="button is-small is-primary is-rounded"
          onClick={() => insertCellBefore(nextCellId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-small is-primary is-rounded"
          onClick={() => insertCellBefore(nextCellId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider" />
    </div>
  );
};
