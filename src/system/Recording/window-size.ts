import { atom, useAtomValue } from 'jotai';

export type WindowSize = [width: number, height: number];

function calculateWindowSize(): WindowSize {
  return [window.innerWidth, window.innerHeight];
}

const windowSize = atom(calculateWindowSize());

windowSize.onMount = (setWindowSize) => {
  const onResize = () => {
    setWindowSize(calculateWindowSize());
  };
  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('resize', onResize);
  };
};

export function useWindowSize(): WindowSize {
  return useAtomValue(windowSize);
}
