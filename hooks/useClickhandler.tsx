import { useCallback, useRef } from "react";

export function useClickHandler<T extends any[]>(
  onClick: (...args: T) => void,
  onDoubleClick: (...args: T) => void,
  delay = 150,
) {
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(
    (...args: T) => {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
        onDoubleClick(...args);
      } else {
        clickTimeout.current = setTimeout(() => {
          onClick(...args);
          clickTimeout.current = null;
        }, delay);
      }
    },
    [onClick, onDoubleClick, delay],
  );

  return handleClick;
}
