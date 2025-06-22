import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement> | RefObject<null>,
  handler: (event: AnyEvent) => void,
) => {
  useEffect(
    () => {
      const listener = (event: AnyEvent) => {
        const target = event.target;
        // Do nothing if clicking ref's element or descendent elements
        if (
          !ref.current ||
          !(target instanceof Node) ||
          ref.current.contains(target)
        ) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
};
