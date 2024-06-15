import React from 'react';
import styled, { keyframes } from 'styled-components';

const NpmToolsSection: React.FC = () => (
  <NpmToolsWrapper>
    <NpmTitle>Community-Driven Tools Available on NPM</NpmTitle>
    <NpmDescription>
      Our suite of tools is not just for web use—they’re also available as NPM packages for developers. Seamlessly integrate our solutions into your projects and streamline your development process.
    </NpmDescription>
    <NpmLink href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">
      Browse Our NPM Libraries
    </NpmLink>
  </NpmToolsWrapper>
);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const NpmToolsWrapper = styled.div`
  padding: 3rem 2rem;
  background-color: #fff;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const NpmTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const NpmDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const NpmLink = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007ad9;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  &:hover {
    background-color: #005bb5;
  }
`;

export { NpmToolsSection };
