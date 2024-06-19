import React from 'react';
import styled from 'styled-components';

import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { characterEntities } from './data';
import { copyToClipboard } from '@/utils/copy';
import { useToast } from '@/components/ui/toast';

interface Props {
}

const CharactersCheatSheetMain: React.FC<Props> = ({}) => {
  const { showToast } = useToast();

  const onCopy = (text: string) => {
    copyToClipboard(text, {
      onSuccess: () => {
        showToast({ severity: 'success', content: 'Copied to clipboard' });
      }
    });
  };

  const renderField = (field: string, isHighlighted: boolean, canCopy: boolean) => {
    return (
      <Field 
        isHighlighted={isHighlighted}
        canCopy={canCopy}
        onClick={canCopy ? () => onCopy(field) : undefined}
      >
        {field}

        {canCopy && 
          <i className='pi pi-copy' />
        }
      </Field>
    );
  };

  return (
    <MainContainer>
      <SingleColumnContainer>
        {characterEntities.map((group, index) => (
          <CharactersGroup key={index}>
            <GroupTitle>{group.groupName}</GroupTitle>

            <CharactersList>
              <HeaderField>Character</HeaderField>
              <HeaderField>Entity Name</HeaderField>
              <HeaderField>Entity Number</HeaderField>
              <HeaderField>Description</HeaderField>

              {group.characters.map((character, index) => {
                return (
                  <React.Fragment key={index}>
                    {renderField(character.character, index % 2 !== 0, true)}
                    {renderField(character.entityName, index % 2 !== 0, true)}
                    {renderField(character.entityNumber, index % 2 !== 0, true)}
                    {renderField(character.description, index % 2 !== 0, false)}
                  </React.Fragment>
                );
              })}
            </CharactersList>
          </CharactersGroup>
        ))}
      </SingleColumnContainer>
    </MainContainer>
  );
}

const CharactersGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

const GroupTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  margin-left: 2rem;
  font-weight: 500;
  color: var(--text-color);
  width: 100%;
  text-align: left;
`;

const CharactersList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  width: 100%;
  border-collapse: collapse;
`;

const HeaderField = styled.div`
  padding: 0.5rem;
  background-color: var(--surface-200);
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-color);
`;

const Field = styled.div<{ isHighlighted: boolean, canCopy: boolean }>`
  padding: 0.5rem;
  background-color: ${({ isHighlighted }) => isHighlighted ? 'var(--surface-100)' : 'transparent'};
  font-size: 0.875rem;
  color: var(--text-color);
  cursor: ${({ canCopy }) => canCopy ? 'pointer' : 'default'};

  > i {
    margin-left: 0.5rem;
    font-size: 0.75rem;
    color: var(--primary-color);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover > i {
    opacity: 1;
  }
`;

export { CharactersCheatSheetMain };