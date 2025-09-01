import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dropdown } from 'primereact/dropdown';

import { generateLoremIpsum } from '@/utils/lorem-ipsum';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { CopyIconButton } from '@/components/ui/icon-buttons/copy-icon-button';
import { RefreshIconButton } from '@/components/ui/icon-buttons/refresh-icon-button';
import { GenerateIcon } from '@/components/icons/generate';

const MainLoremIpsumGenerator: React.FC = () => {
  const [type, setType] = useState<'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [content, setContent] = useState<string>('');

  const handleGenerate = () => {
    const generated = generateLoremIpsum(type, count);
    setContent(generated);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const copyContent = () => {
    navigator.clipboard.writeText(content);
  };

  const typeOptions = [
    { label: 'Sentences', value: 'sentences' },
    { label: 'Paragraphs', value: 'paragraphs' },
  ];

  return (
    <Container>
      <Toolbar>
        <ToolbarGroup>
          <Label>Type:</Label>
          <Dropdown
            value={type}
            options={typeOptions}
            onChange={(e) => setType(e.value)}
            placeholder="Select type"
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <Label>Count:</Label>
          <NumberInput
            value={count}
            onChange={setCount}
            min={1}
            max={100}
          />
        </ToolbarGroup>
        <BaseTextButton
          text="Generate"
          icon={<GenerateIcon width="24" height="24" />}
          onClick={handleGenerate}
          isPrimary
        />
      </Toolbar>
      
      {content && (
        <ContentBlock>
          <LoremContent>
            <TopBar>
              <TopBarActions>
                <CopyIconButton text={content} className="action-icon" />
                <RefreshIconButton onClick={handleGenerate} />
              </TopBarActions>
            </TopBar>
            {content}
          </LoremContent>
        </ContentBlock>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem;
  background: var(--surface-50, #f5f5f5);
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
`;

const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--surface-700, #555);
  white-space: nowrap;
`;



const ContentBlock = styled.div`
  position: relative;
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--surface-200, #e5e5e5);
  margin-bottom: 1rem;
`;

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .action-icon {
    width: 20px !important;
    height: 20px !important;
    color: var(--primary-color);
    svg, .icon * {
      width: 20px !important;
      height: 20px !important;
      fill: var(--primary-color);
    }
  }
`;

const LoremContent = styled.div`
  background: var(--surface-50, #f5f5f5);
  border-radius: 0.75rem;
  padding: 1.5rem;
  font-size: 1.08rem;
  font-family: inherit;
  color: var(--surface-900, #222);
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
  white-space: pre-wrap;
  word-break: break-word;
  transition: background 0.2s;

  p, pre {
    margin: 0 0 1.1em 0;
  }

  @media (max-width: 600px) {
    padding: 1rem;
    font-size: 0.98rem;
  }
`;

export { MainLoremIpsumGenerator };