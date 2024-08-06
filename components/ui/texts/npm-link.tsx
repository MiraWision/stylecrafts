import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  packageName: string;
}

const NPMLink: React.FC<Props> = ({ text, packageName }) => {
  return (
    <Container>
      <Text>{text}</Text>
      
      <Link 
        href={`https://www.npmjs.com/package/${packageName}`}
        target='_blank'
      >
        {/* <Logo src='../icons/npm.svg' alt='NPM logo' /> */}
        {packageName}
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-top: 1rem;
`;

const Text = styled.span`
  font-size: 0.875rem;
  color: var(--text-color);
  text-align: right;
`;

const Logo = styled.img`
  height: 1.5rem;
  margin-bottom: -0.5rem;
  margin-right: 0.125rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #cb3837;
  font-size: 0.875rem;
  margin-left: 0.25rem;
`;

export { NPMLink };