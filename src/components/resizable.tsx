import '../assets/css/resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { FC } from 'react';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: FC<ResizableProps> = ({direction, children}) => {
  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity]
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 24]
    };
  }

  return <ResizableBox{...resizableProps} >
    {children}
  </ResizableBox>;
};

export default Resizable;
