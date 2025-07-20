import React, { useState } from 'react';
import styled from 'styled-components';

import { generateLoremIpsum } from '@/utils/lorem-ipsum';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { BaseTextButton, DropdownTextButton } from '@/components/ui/text-buttons/base-text-button';
import { CopyIconButton } from '@/components/ui/icon-buttons/copy-icon-button';
import { RefreshIconButton } from '@/components/ui/icon-buttons/refresh-icon-button';
import { Logo } from '@/components/ui/logo';

const MainLoremIpsumGenerator: React.FC = () => {
  const [type, setType] = useState<'sentences' | 'paragraphs'>('sentences');
  const [count, setCount] = useState<number>(5);
  const [content, setContent] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleGenerate = () => {
    const generated = generateLoremIpsum(type, count);
    setContent(generated);
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content);
  };

  const typeOptions = [
    { label: 'Sentences', onClick: () => setType('sentences') },
    { label: 'Paragraphs', onClick: () => setType('paragraphs') },
  ];

  return (
    <Container>
      <Form>
        <FormRow>
          <Label htmlFor="type">Content Type:</Label>
          <DropdownTextButton
            text={type === 'sentences' ? 'Sentences' : 'Paragraphs'}
            options={typeOptions}
            isPrimary
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="count">Number:</Label>
          <NumberInput
            value={count}
            onChange={setCount}
            min={1}
            max={100}
          />
        </FormRow>
        <BaseTextButton text="Generate" onClick={handleGenerate} isPrimary style={{ marginTop: '1rem', width: 'fit-content' }} />
      </Form>
      {content && (
        <ContentBlock>
          <LoremContent>
            <TopBar>
              <LogoInBar />
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
`;

const ContentBlock = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border-bottom: none;
  background: transparent;
  border-radius: 0.75rem 0.75rem 0 0;
  min-height: 2.2rem;
  gap: 1rem;

  @media (max-width: 600px) {
    min-height: 1.7rem;
  }
`;

const LogoInBar = styled(Logo)`
  .icon, img {
    width: 20px !important;
    height: 20px !important;
    margin-right: 0;
    filter: brightness(0) saturate(100%) invert(36%) sepia(99%) saturate(749%) hue-rotate(230deg) brightness(97%) contrast(101%);
  }
  span, b {
    display: none;
  }
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

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const LoremContent = styled.div`
  background: var(--surface-50, #f5f5f5);
  border-radius: 0.75rem;
  padding: 0.625rem 1.5rem 1.25rem 1.5rem;
  font-size: 1.08rem;
  font-family: inherit;
  color: var(--surface-900, #222);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
  white-space: pre-wrap;
  word-break: break-word;
  transition: background 0.2s;

  p, pre {
    margin: 0 0 1.1em 0;
  }

  @media (max-width: 600px) {
    padding: 0.4rem 0.7rem 1rem 0.7rem;
    font-size: 0.98rem;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Label = styled.label`
  margin-right: 8px;
  width: 120px;
`;

export { MainLoremIpsumGenerator };