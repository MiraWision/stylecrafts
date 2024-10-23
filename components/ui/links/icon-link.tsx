import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ColorInspectorIcon } from '@/components/icons/color-inspector';

interface Props {
  href: string;
  text: string;
}

const IconLink: React.FC<Props> = ({ href, text }) => {
  return (
    <StyledLink href={href} passHref>
      <StyledIconLink>
        <ColorInspectorIcon width="16" height="16" />
        <span>{text}</span>
      </StyledIconLink>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  all: unset;
`;

const StyledIconLink = styled.a`
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: var(--color-primary-hover);
    transform: translateY(-2px);
  }

  span {
    position: relative;
    transition: color 0.3s ease;
  }

  &:hover span::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background-color: var(--color-primary-hover);
  }

  svg {
    fill: var(--color-primary);
    transition: fill 0.3s ease;
  }

  &:hover svg {
    fill: var(--color-primary-hover);
  }
`;

export { IconLink };
