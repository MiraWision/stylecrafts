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
        <Logo src='icons/npm.svg' alt='NPM logo' />
        {packageName}
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Text = styled.span`
  font-size: 14px;
  color: var(--text-color-secondary);
`;

const Logo = styled.img`
  height: 24px;
  margin-bottom: -8px;
  margin-right: 2px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #cb3837;
  font-size: 14px;
`;

export { NPMLink };