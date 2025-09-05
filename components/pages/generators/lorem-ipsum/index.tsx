import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { generateLoremIpsum } from '@/utils/lorem-ipsum';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { Select } from '@/components/ui/inputs/select';
import { Label } from '@/components/ui/texts/label';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { GenerateIcon } from '@/components/icons/generate';
import { CopyIcon } from '@/components/icons/copy';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import { useToast } from '@/components/ui/toast';
import { ToolCrossLinks } from '@/components/ui/cross-links';

const MainLoremIpsumGenerator: React.FC = () => {
  const [type, setType] = useState<'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [content, setContent] = useState<string>('');
  const [showCheckmark, setShowCheckmark] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    const generated = generateLoremIpsum(type, count);
    setContent(generated);
    
    GAService.logEvent(analyticsEvents.generators.loremIpsum.textGenerated(type, count.toString()));
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const copyContent = () => {
    navigator.clipboard.writeText(content).then(() => {
      toast.success('Copied!', 'Lorem ipsum text copied to clipboard');
      setShowCheckmark(true);
      setTimeout(() => {
        setShowCheckmark(false);
      }, 2000);
      
      GAService.logEvent(analyticsEvents.generators.loremIpsum.textCopied(type, count.toString()));
    }).catch(() => {
      toast.error('Failed to copy', 'Unable to copy text to clipboard');
    });
  };

  const typeOptions = [
    { label: 'Sentences', value: 'sentences' },
    { label: 'Paragraphs', value: 'paragraphs' },
  ];

  return (
    <Container>
      <Toolbar>
        <ToolbarGroup>
          <Field>
            <Label>Type</Label>
            <Select
              value={type}
              options={typeOptions}
              onChange={setType}
              placeholder="Select type"
            />
          </Field>
        </ToolbarGroup>
        <ToolbarGroup>
          <Field>
            <Label>Count</Label>
            <NumberInput
              value={count}
              onChange={setCount}
              min={1}
              max={100}
            />
          </Field>
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
          <LoremContent onClick={copyContent}>
            <CopyIconWrapper>
              {showCheckmark ? (
                <CheckmarkIcon width="16" height="16" />
              ) : (
                <CopyIcon width="16" height="16" />
              )}
            </CopyIconWrapper>
            {content}
          </LoremContent>
        </ContentBlock>
      )}

      <ToolCrossLinks
        toolKey="lorem-ipsum-generator"
        title="Explore More Generator Tools"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
  background: var(--surface-50, #f5f5f5);
  border-radius: 0.75rem;
`;

const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CopyIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  
  .icon * {
    fill: var(--primary-color);
  }
`;

const ContentBlock = styled.div`
  position: relative;
  width: 100%;
`;

const LoremContent = styled.div`
  position: relative;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: var(--surface-900);
  line-height: 1.7;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.07);
  white-space: pre-wrap;
  word-break: break-word;
  transition: background 0.2s;
  cursor: pointer;

  ${CopyIconWrapper} {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 10;
  }

  &:hover ${CopyIconWrapper} {
    opacity: 1;
  }

  p, pre {
    margin: 0 0 1rem 0;
  }

  @media (max-width: 600px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

export { MainLoremIpsumGenerator };