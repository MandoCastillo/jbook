import '../assets/css/resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { FC, useEffect, useState } from 'react';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: FC<ResizableProps> = ({direction, children}) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if(window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75)
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24]
    };
  }

  return <ResizableBox{...resizableProps} >
    {children}
  </ResizableBox>;
};

export default Resizable;
