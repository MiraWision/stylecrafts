import React from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { characterEntities } from './data';
import { CheatSheetTable } from '../cheatsheet-table';

interface Props {
}

const CharactersCheatSheetMain: React.FC<Props> = ({}) => {
  const onCopy = (text: string) => {
    GAService.logEvent(analyticsEvents.cheatsheets.characters.characterCopied(text));
  }

  return (
    <MainContainer>
      <SingleColumnContainer>
        {characterEntities.map((group, index) => (
          <CharactersGroup key={index}>
            <CheatSheetTable
              title={group.groupName}
              columns={[
                { header: 'Symbol', isLarge: true, canCopy: true },
                { header: 'Entity Name', isLarge: false, canCopy: true },
                { header: 'Entity Number', isLarge: false, canCopy: true },
                { header: 'Description', isLarge: false, canCopy: false, width: 2 }
              ]}
              data={group.characters.map((character) => [
                character.character,
                character.entityName,
                character.entityNumber,
                character.description
              ])}
              onCopyCallback={onCopy}
            />
          </CharactersGroup>
        ))}
      </SingleColumnContainer>
    </MainContainer>
  );
}

const CharactersGroup = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

export { CharactersCheatSheetMain };