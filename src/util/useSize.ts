import { useState, useEffect } from 'react';

export type Size = {
  width: number | undefined;
  height: number | undefined;
};

// Usage
// function App() {
//   const size: Size = useWindowSize();
//   return (
//     <div>
//       {size.width}px / {size.height}px
//     </div>
//   );
// }

// Hook
export const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};
