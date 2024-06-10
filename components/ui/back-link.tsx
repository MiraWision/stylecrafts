import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  href: string;
  children: React.ReactNode;
}

const BackLink: React.FC<Props> = ({ href, children }) => (
  <LinkStyled href={href}>
    <Icon className='pi pi-angle-left' />

    {children}
  </LinkStyled>
);

const Icon = styled.i`
  font-size: 0.875rem;
  margin-right: 0.125rem;
`;

const LinkStyled = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

export { BackLink };
