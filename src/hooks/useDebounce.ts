/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>): void => {
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
