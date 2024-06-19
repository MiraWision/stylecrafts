import React from 'react';
import styled from 'styled-components';

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
}

const CheatSheetTable: React.FC<Props> = ({ title, columns, data }) => {
  const { toast } = useToast();

  const onCopy = (text: string) => {
    copyToClipboard(text, {
      onSuccess: () => {
        toast.success('Character copied to clipboard', text);
      }
    });
  };

  return (
    <Container>
      <GroupTitle>{title}</GroupTitle>

      <CharactersList columns={columns.map(({ width }) => `${width ?? 1}fr`).join(' ')}>
        {columns.map((column, index) => (
          <HeaderField key={index}>
            {column.header}
          </HeaderField>
        ))}

        {data.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((field, fieldIndex) => (
              <Field 
                isHighlighted={index % 2 !== 0}
                canCopy={columns[fieldIndex].canCopy}
                isLarge={columns[fieldIndex].isLarge}
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

const CharactersList = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
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

const Field = styled.div<{ isHighlighted: boolean, canCopy: boolean, isLarge: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: ${({ isHighlighted }) => isHighlighted ? 'var(--surface-100)' : 'transparent'};
  font-size: ${({ isLarge }) => isLarge ? '1.25rem' : '0.875rem'};
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

export { CheatSheetTable };