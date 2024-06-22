import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  sections: { id: string; title: string }[];
}

const FloatingMenu: React.FC<Props> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentSection = null;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (element && element.offsetTop <= scrollPosition) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MenuContainer>
      {sections.map(section => (
        <MenuItem
          key={section.id}
          isActive={section.id === activeSection}
          onClick={() => handleClick(section.id)}
        >
          {section.title}
        </MenuItem>
      ))}
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: fixed;
  z-index: 100;
  top: 10rem;
  right: calc(50vw + 13.75rem);
  width: fit-content;
  max-width: calc(50vw - 29rem);
  background: var(--surface-50);
  border: 1px solid (--surface-border);
  padding: 0.25rem;
  overflow-y: auto;
  box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  border-radius: 0.25rem;

  @media (max-width: 67rem) {
    position: relative;
    top: auto;
    right: auto;
    width: fit-content;
    max-width: 100%;
  }
`;

const MenuItem = styled.div<{ isActive: boolean }>`
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  color: var(--text-color);
  font-weight: 400;

  &:hover {
    font-weight: 500;  
  }

  ${({ isActive }) => isActive && css`
    font-weight: 500;  
    color: var(--primary-color);
  `}
`;

export { FloatingMenu };
