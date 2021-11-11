import React, { FC, Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { CellListItem } from './cell-list-item';
import { AddCell } from './add-cell';

interface CellListProps {
}

export const CellList: FC<CellListProps> = ({}) => {
  const cells = useTypedSelector(({cells}) => {
    if (!cells) return [];
    return cells.order.map(id =>cells.data[id]);
  });

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id} >
      <AddCell nextCellId={cell.id}/>
      <CellListItem cell={cell}/>
    </Fragment>
  ))

  return (
    <>
      <p>{renderedCells}</p>
      <AddCell nextCellId={null}/>
    </>
  );
};
