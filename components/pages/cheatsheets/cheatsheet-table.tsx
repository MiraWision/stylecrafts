import React from 'react';
import styled from 'styled-components';

import { generateSlug } from '@/utils/text';
import { copyToClipboard } from '@/utils/copy';
import { useToast } from '@/components/ui/toast';

interface Column {
  header: string;
  isLarge: boolean;
  canCopy: boolean;
  width?: number;
}

interface Props {
  title: string;
  columns: Column[];
  data: string[][];
  onCopyCallback?: (text: string) => void;
}

const CheatSheetTable: React.FC<Props> = ({ title, columns, data, onCopyCallback }) => {
  const { toast } = useToast();

  const onCopy = (text: string) => {
    copyToClipboard(text, {
      onSuccess: () => {
        toast.success('Character copied to clipboard', text);

        if (onCopyCallback) {
          onCopyCallback(text);
        }
      }
    });
  };

  return (
    <Container>
      <GroupTitle id={generateSlug(title)}>{title}</GroupTitle>

      <CharactersList $columns={columns.map(({ width }) => `${width ?? 1}fr`).join(' ')}>
        {columns.map((column, index) => (
          <HeaderField key={index}>
            {column.header}
          </HeaderField>
        ))}

        {data.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((field, fieldIndex) => (
              <Field 
                $isHighlighted={index % 2 !== 0}
                $canCopy={columns[fieldIndex].canCopy}
                $isLarge={columns[fieldIndex].isLarge}
                onClick={columns[fieldIndex].canCopy ? () => onCopy(field) : undefined}
              >
                {field}
        
                {columns[fieldIndex].canCopy && 
                  <i className='pi pi-copy' />
                }
              </Field>
            ))}
          </React.Fragment>
        ))}
      </CharactersList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: calc(100vw - 2rem);
  }
`;

const GroupTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
  width: 100%;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 1rem;
  }
`;

const CharactersList = styled.div.attrs<{ $columns: string }>(({ $columns }) => ({
  style: {
    gridTemplateColumns: $columns,
  },
}))`
  display: grid;
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

const Field = styled.div.attrs<{ $isHighlighted: boolean, $canCopy: boolean, $isLarge: boolean }>(({ $isHighlighted, $canCopy, $isLarge }) => ({
  className: `${$isHighlighted ? 'highlighted' : ''} ${$canCopy ? 'copyable' : ''} ${$isLarge ? 'large' : ''}`,
}))`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: transparent;
  font-size: 0.875rem;
  color: var(--text-color);
  cursor: default;
  
  &.highlighted {
    background-color: var(--surface-100);
  }

  &.large {
    font-size: 1.25rem;
  }

  &.copyable {
    cursor: pointer;
  }
  
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

  @media (max-width: 768px) {
    padding: 0.25rem 0.25rem;
    
    &.large {
      font-size: 1rem;
    }

    &:not(.large) {
      font-size: 0.75rem;
    }
  }
`;

export { CheatSheetTable };