import React, { FC } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { CellListItem } from './cell-list-item';

interface CellListProps {
}

export const CellList: FC<CellListProps> = ({}) => {
  const cells = useTypedSelector(({cells}) => {
    if (!cells) return [];
    return cells.order.map(id =>cells.data[id]);
  });

  const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell}/>)

  return (
    <>
      <p>{renderedCells}</p>
    </>
  );
};
