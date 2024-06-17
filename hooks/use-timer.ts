import { useState, useRef, useEffect, useCallback } from 'react';

interface UseTimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
}

interface TimerControls {
  play: (startSeconds?: number) => void;
  pause: (pauseTime?: number) => void;
  stop: () => void;
  reset: () => void;
  adjustTime: (seconds: number) => void;
  setTime: (seconds: number) => void;
}

const useTimer = ({ initialSeconds, onTimeUp }: UseTimerProps): [number, number, TimerControls] => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const play = useCallback((startSeconds?: number) => {
    if (startSeconds !== undefined) {
      setRemainingSeconds(Math.max(0, startSeconds));

      setElapsedSeconds(0);
    }
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  const pause = useCallback((pauseTime?: number) => {
    if (isRunning) {
      setIsRunning(false);

      if (pauseTime !== undefined) {
        setRemainingSeconds(Math.max(0, pauseTime));
      }
    }
  }, [isRunning]);

  const stop = useCallback(() => {
    setIsRunning(false);

    setRemainingSeconds(0);

    setElapsedSeconds(0);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const reset = useCallback(() => {
    setRemainingSeconds(initialSeconds);
    
    setElapsedSeconds(0);
    
    setIsRunning(false);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [initialSeconds]);

  const adjustTime = useCallback((seconds: number) => {
    setRemainingSeconds((prev) => Math.max(0, prev + seconds));
  }, []);

  const setTime = useCallback((seconds: number) => {
    setRemainingSeconds(Math.max(0, seconds));
    
    setElapsedSeconds(0);
  }, []);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      timerRef.current = setTimeout(() => {
        setRemainingSeconds((prev) => prev - 1);
        
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (remainingSeconds === 0 && isRunning) {
      setIsRunning(false);
      
      onTimeUp();
      
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRunning, remainingSeconds, onTimeUp]);

  return [
    remainingSeconds,
    elapsedSeconds,
    { play, pause, stop, reset, adjustTime, setTime }
  ];
};

export { useTimer };
