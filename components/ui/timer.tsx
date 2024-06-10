import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  duration: number; 
  onTimeUp: () => void;
}

const Timer: React.FC<Props> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          
          onTimeUp();
          
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeUp]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    
    const seconds = time % 60;
    
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <StyledTimer>
      {formatTime(timeLeft)}
    </StyledTimer>
  );
};

const StyledTimer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 1rem 0;
`;

export { Timer };
