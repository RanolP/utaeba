import { HTMLAttributes } from 'react';

export interface TimerProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Time, in millis.
   */
  time: number;
}

export function Timer({ time, ...props }: TimerProps): JSX.Element {
  const millis = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutesRaw = Math.floor(time / 1000 / 60);
  const minutes = minutesRaw % 60;
  const hours = Math.floor(time / 1000 / 60 / 60);

  const highlightHours = hours > 0;
  const highlightMinutes = minutes > 0;

  return (
    <p {...props}>
      <span className={highlightHours ? 'highlight' : ''}>
        {hours.toString().padStart(2, '0')}:
      </span>
      <span className={highlightMinutes ? 'highlight' : ''}>
        {minutes.toString().padStart(2, '0')}:
      </span>
      <span className="highlight">
        {seconds.toString().padStart(2, '0')}.
        {millis.toString().padStart(3, '0')}
      </span>
    </p>
  );
}
