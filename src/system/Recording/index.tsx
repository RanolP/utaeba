import { MdRadioButtonChecked } from 'react-icons/md';
import { styled } from '@linaria/react';
import { ThemeVars } from '../../styles/theme';
import OpenColor from 'open-color';
import { Timer } from '../Timer';
import { useWindowSize } from './window-size';

const Toolbox = styled.div`
  height: 256px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RecordButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 2rem;
  font-size: 1.5rem;

  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${ThemeVars.RecordButton};
`;

const StyledTimer = styled(Timer)`
  font-size: 2rem;
  font-feature-settings: 'tnum';

  width: 16rem;
  text-align: center;

  & :not(.highlight) {
    opacity: 0.3;
  }
`;

export type Segment = { volume: number; pitch: number };

const generateSegment = () => ({ volume: Math.random(), pitch: Math.random() });

const segments = Array(1000)
  .fill(0)
  .map(() => generateSegment());

export function Recording(): JSX.Element {
  const [width, height] = useWindowSize();
  const barWidth = 8;

  const pitchGraphPoints = [];
  for (const [i, { pitch }] of segments.entries()) {
    const x = width / 2 - i * barWidth;
    const y = -pitch * 300 + ((height - 256) * 2) / 3;
    if (x + barWidth / 2 < -barWidth * 6) {
      break;
    }
    pitchGraphPoints.push([x, y]);
  }

  const volumeRects = [];
  for (const [i, { volume }] of segments.entries()) {
    const barMargin = 2;
    const barHeight = volume * 100;
    const x = width / 2 - i * barWidth - (barWidth - barMargin) / 2;
    const y = (height - 256) / 2 - barHeight / 2;
    if (x + barWidth / 2 < -barWidth * 6) {
      break;
    }
    volumeRects.push(
      <rect
        width={barWidth - barMargin}
        height={barHeight}
        x={x}
        y={y}
        fill={OpenColor.gray[3]}
        rx={(barWidth - barMargin) / 2}
      />,
    );
  }

  return (
    <div>
      <svg width="100vw" height={height - 256}>
        <rect x="50%" y="0" width="4" height={height} fill={OpenColor.red[7]} />
        <polyline
          points={pitchGraphPoints.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke={OpenColor.cyan[3]}
          strokeWidth="0.125rem"
        />
        <g>{volumeRects}</g>
      </svg>
      <Toolbox>
        <RecordButton>
          <MdRadioButtonChecked />
        </RecordButton>
        <StyledTimer time={1234567} />
      </Toolbox>
    </div>
  );
}
