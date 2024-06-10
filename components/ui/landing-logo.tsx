import React from 'react';
import styled from 'styled-components';

const LandingLogo: React.FC = () => {
  return (
    <LogoContainer>
      <LogoText gradient='to bottom right, var(--pink-400), var(--primary-color)'>
        CSS Craft
      </LogoText>
      <Divider />
      <LogoText gradient='to bottom right, var(--pink-400), var(--primary-color)'>
        @mirawision
      </LogoText>
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoText = styled.div<{ gradient?: string }>`
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(${({ gradient }) => gradient});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Divider = styled.div`
  width: 13rem;
  height: 0.2rem;
  background-color: var(--surface-700);
  margin: 0.5rem 0;
  border-radius: 100%;
`;

export { LandingLogo };
