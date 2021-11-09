import React, { FC } from 'react';
import { ICell } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import { ActionBar } from './action-bar';

interface CellListItemProps {
  cell: ICell;
}

export const CellListItem: FC<CellListItemProps> = ({cell}) => {
  let child: JSX.Element;

  if (cell.type === 'code') {
    child = <CodeCell cell={cell} />;
  } else {
    child = <TextEditor cell={cell} />;
  }

  return (
    <>
      <ActionBar id={cell.id} />
      {child}
    </>
  );
};
