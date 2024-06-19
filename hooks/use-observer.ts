import { useEffect, useRef, RefObject, useState } from 'react';

interface ObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  stopAfterFirstIntersection?: boolean;
}

const useObserver = <T extends HTMLElement>(
  callback?: (entry: IntersectionObserverEntry) => void,
  options: ObserverOptions = { threshold: 0.1 }
): [RefObject<T>, boolean] => {
  const ref = useRef<T>(null);

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);

          callback?.(entry);

          if (options.stopAfterFirstIntersection) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback, options]);

  return [ref, isIntersecting];
};

export { useObserver };
