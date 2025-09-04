import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  sections: { id: string; title: string }[];
}

const FloatingMenu: React.FC<Props> = ({ sections }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [activeSection, setActiveSection] = useState<string | null>(sections[0]?.id);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // On mobile, always show expanded view; on desktop, use hover state
  const shouldShowExpanded = isMobile || isMenuVisible;

  return (
    <MenuContainer
      $isMenuVisible={shouldShowExpanded}
      onMouseEnter={() => !isMobile && setIsMenuVisible(true)}
      onMouseLeave={() => !isMobile && setIsMenuVisible(false)}
    >
      {shouldShowExpanded && sections.map((section) => (
        <MenuItem
          key={section.id}
          $isActive={section.id === activeSection}
          onClick={() => handleClick(section.id)}
        >
          {section.title}
        </MenuItem>
      ))}

      {!shouldShowExpanded && sections.map((section) => (
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
    border-color: transparent;
    padding: 0;
    margin-bottom: 1rem;
    z-index: 1;
  }

  &.hidden {
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
    font-weight: 700;  
  }

  &.active {
    font-weight: 700;
    color: var(--primary-color);
  }
`;

const MenuDash = styled.div.attrs<{ $isActive: boolean }>(({ $isActive }) => ({
  className: $isActive ? 'active' : '',
}))`
  width: 1rem;
  height: 0.125rem;
  background: var(--surface-400);
  margin: 0.6875rem 0;
  margin-left: 0.5rem;
  border-radius: 0.125rem;
  transition: all 0.3s;

  &.active {
    width: 1.5rem;
    margin-left: 0rem;
    background: var(--primary-color);
  }
`;

export { FloatingMenu };
