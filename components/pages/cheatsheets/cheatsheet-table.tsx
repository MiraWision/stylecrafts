import React, { useState } from 'react';
import styled from 'styled-components';

import { generateSlug } from '@/utils/text';
import { copyToClipboard } from '@/utils/copy';
import { useToast } from '@/components/ui/toast';
import { CopyIcon } from '@/components/icons/copy';
import { CheckmarkIcon } from '@/components/icons/checkmark';

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
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const onCopy = (text: string, fieldKey: string) => {
    copyToClipboard(text, {
      onSuccess: () => {
        toast.success('Copied!', 'Character copied to clipboard');

        if (onCopyCallback) {
          onCopyCallback(text);
        }

        // Set the copied field to show checkmark
        setCopiedField(fieldKey);

        // Reset after 3 seconds
        setTimeout(() => {
          setCopiedField(null);
        }, 3000);
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
            {row.map((field, fieldIndex) => {
              const fieldKey = `${index}-${fieldIndex}`;
              const isCopied = copiedField === fieldKey;
              
              return (
                <Field
                  key={fieldIndex}
                  $isHighlighted={index % 2 !== 0}
                  $canCopy={columns[fieldIndex].canCopy}
                  $isLarge={columns[fieldIndex].isLarge}
                  onClick={columns[fieldIndex].canCopy ? () => onCopy(field, fieldKey) : undefined}
                >
                  {field}
          
                  {columns[fieldIndex].canCopy && (
                    isCopied ? (
                      <CheckmarkIcon width='16' height='16' />
                    ) : (
                      <CopyIcon width='16' height='16' />
                    )
                  )}
                </Field>
              );
            })}
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
  
  .icon {
    margin-left: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s;

    * {
      fill: var(--primary-color);
    }
  }

  &:hover > .icon {
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