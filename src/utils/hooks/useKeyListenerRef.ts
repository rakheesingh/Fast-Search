import { useCallback, useRef } from "react";

export function useKeyListenerRef<T extends HTMLElement>(
  callback: (event: KeyboardEvent) => void,
): [(node: T | null) => void] {
  const ref = useRef<T | null>(null);

  const setRef = useCallback(
    (node: T | null) => {
      if (ref.current) {
        ref.current.removeEventListener("keyup", callback);
      }

      if (node) {
        node.addEventListener("keyup", callback);
      }

      // Save a reference to the node
      ref.current = node;
    },
    [callback],
  );

  return [setRef];
}
