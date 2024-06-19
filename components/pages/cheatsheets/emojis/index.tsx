import React from 'react';
import styled from 'styled-components';

import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { emojiEntities } from './data';
import { CheatSheetTable } from '../cheatsheet-table';

interface Props {
}

const EmojisCheatSheetMain: React.FC<Props> = ({}) => {
  return (
    <MainContainer>
      <SingleColumnContainer>
        {emojiEntities.map((group, index) => (
          <EmojisGroup key={index}>
            <CheatSheetTable
              title={group.groupName}
              columns={[
                { header: 'Emoji', isLarge: true, canCopy: true },
                { header: 'Code', isLarge: false, canCopy: true },
                { header: 'Description', isLarge: false, canCopy: false, width: 2 }
              ]}
              data={group.characters.map((character) => [
                character.emoji,
                character.code,
                character.description
              ])}
            />
          </EmojisGroup>
        ))}
      </SingleColumnContainer>
    </MainContainer>
  );
}

const EmojisGroup = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

export { EmojisCheatSheetMain };