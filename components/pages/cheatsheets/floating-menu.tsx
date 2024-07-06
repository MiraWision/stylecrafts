import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  sections: { id: string; title: string }[];
}

const FloatingMenu: React.FC<Props> = ({ sections }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  
  const [activeSection, setActiveSection] = useState<string | null>(sections[0]?.id);

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
    <MenuContainer
      $isMenuVisible={isMenuVisible}
      onMouseEnter={() => setIsMenuVisible(true)}
      onMouseLeave={() => setIsMenuVisible(false)}
    >
      {isMenuVisible && sections.map((section) => (
        <MenuItem
          key={section.id}
          $isActive={section.id === activeSection}
          onClick={() => handleClick(section.id)}
        >
          {section.title}
        </MenuItem>
      ))}

      {!isMenuVisible && sections.map((section) => (
        <MenuDash
          key={section.id} 
          $isActive={section.id === activeSection}
        />
      ))}
    </MenuContainer>
  );
};

const MenuContainer = styled.div.attrs<{ $isMenuVisible: boolean }>(({ $isMenuVisible }) => ({
  className: $isMenuVisible ? 'visible' : 'hidden',
}))`
  position: fixed;
  z-index: 100;
  top: 10rem;
  right: calc(50vw + 13.75rem);
  width: 12rem;
  max-width: 12rem;
  background: var(--surface-50);
  padding: 0.25rem;
  overflow-y: auto;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  transition: all 0.5s;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    width: fit-content;
    max-width: 100%;
  }

  &.visible {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
    border-color: transparent;
    width: 2rem;
    max-width: 2rem;
  }
`;

const MenuItem = styled.div.attrs<{ $isActive: boolean }>(({ $isActive }) => ({
  className: $isActive ? 'active' : '',
}))`
  padding: 0rem 0.5rem;
  cursor: pointer;
  color: var(--surface-400);
  font-weight: 300;
  min-width: 12rem;
  height: 1.5rem;
  display: flex;
  align-items: center;

  &:hover {
    font-weight: 500;  
  }

  &.active {
    font-weight: 500;
    color: var(--primary-color);
  }
`;

const MenuDash = styled.div.attrs<{ $isActive: boolean }>(({ $isActive }) => ({
  className: $isActive ? 'active' : '',
}))`
  width: 1.25rem;
  height: 0.125rem;
  background: var(--surface-400);
  margin: 0.6875rem 0;
  border-radius: 0.125rem;

  &.active {
    background: var(--primary-color);
  }
`;

export { FloatingMenu };
