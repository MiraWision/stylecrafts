import React from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { generateSlug } from '@/utils/text';

import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { emojiEntities } from './data';
import { CheatSheetTable } from '../cheatsheet-table';
import { FloatingMenu } from '../floating-menu';

interface Props {
}

const EmojisCheatSheetMain: React.FC<Props> = ({}) => {
  const onCopy = (text: string) => {
    GAService.logEvent(analyticsEvents.cheatsheets.emojis.emojiCopied(text));
  };
  
  return (
    <MainContainer>
      <FloatingMenu 
        sections={emojiEntities.map((group) => ({ id: generateSlug(group.groupName), title: group.groupName }))} 
      />
      
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
              onCopyCallback={onCopy}
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