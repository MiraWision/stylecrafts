import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ChevronLeftIcon } from '@/components/icons/chevron-left';

interface Props {
  href: string;
  children: React.ReactNode;
}

const BackLink: React.FC<Props> = ({ href, children }) => (
  <LinkStyled href={href}>
    <ChevronLeftIcon />

    {children}
  </LinkStyled>
);

const LinkStyled = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;

  .icon * {
    fill: var(--primary-color);
  }

  &:hover {
    text-decoration: underline;
  }
`;

export { BackLink };
