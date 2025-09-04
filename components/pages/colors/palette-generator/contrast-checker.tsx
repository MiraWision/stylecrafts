import React, { useMemo } from 'react';
import styled from 'styled-components';

import { checkContrast } from '@/utils/check-contrast';
import { PaletteColor } from './types';

import { ErrorIcon } from '@/components/icons/error';
import { WarningIcon } from '@/components/icons/warning';

interface Props {
  selectedColors: PaletteColor[];
}

interface ContrastIssue {
  severity: 'error' | 'warning';
  message: string;
}

const ContrastChecker: React.FC<Props> = ({ selectedColors }) => {
  const contrastIssues = useMemo<ContrastIssue[]>(() => {
    const backgroundColor = selectedColors[0].baseColor;
    const textColor = selectedColors[1].baseColor;
    const primaryColor = selectedColors[2].baseColor;
    const additionalColor = selectedColors[3].baseColor;

    const issues: ContrastIssue[] = [];

    const contrstBetweenBackgroundAndText = checkContrast(backgroundColor, textColor);

    if (!contrstBetweenBackgroundAndText.isHeaderSuitableForAA) {
      issues.push({
        severity: 'error',
        message: `Contrast between background and text (${contrstBetweenBackgroundAndText.contrast.toFixed(2)}) is not suitable for AA level for headers (3)`,
      });
    } else if (!contrstBetweenBackgroundAndText.isHeaderSuitableForAAA) {
      issues.push({
        severity: 'error',
        message: `Contrast between background and text (${contrstBetweenBackgroundAndText.contrast.toFixed(2)}) is not suitable for AAA level for headers (4.5)`,
      });
    } else if (!contrstBetweenBackgroundAndText.isTextSuitableForAAA) {
      issues.push({
        severity: 'warning',
        message: `Contrast between background and text (${contrstBetweenBackgroundAndText.contrast.toFixed(2)}) is not suitable for AAA level for text (7)`,
      });
    }

    const contrastBetweenBackgroundAndPrimary = checkContrast(backgroundColor, primaryColor);

    if (!contrastBetweenBackgroundAndPrimary.isObjectSuitable) {
      issues.push({
        severity: 'warning',
        message: `Contrast between background and primary color (${contrastBetweenBackgroundAndPrimary.contrast.toFixed(2)}) is not suitable`,
      });
    }

    const contrastBetweenBackgroundAndAdditional = checkContrast(backgroundColor, additionalColor);

    if (!contrastBetweenBackgroundAndAdditional.isObjectSuitable) {
      issues.push({
        severity: 'warning',
        message: `Contrast between background and additional color (${contrastBetweenBackgroundAndAdditional.contrast.toFixed(2)}) is not suitable`,
      });
    }

    selectedColors.slice(4).forEach((color, index) => {
      const contrastBetweenBackgroundAndAdditional = checkContrast(backgroundColor, color.baseColor);

      if (!contrastBetweenBackgroundAndAdditional.isObjectSuitable) {
        issues.push({
          severity: 'warning',
          message: `Contrast between background and additional color ${index + 1} (${contrastBetweenBackgroundAndAdditional.contrast.toFixed(2)}) is not suitable`,
        });
      }
    });
    
    return issues;
  }, [selectedColors]);

  if (contrastIssues.length === 0) {
    return null;
  }

  return (
    <CheckerContainer>
      {contrastIssues.map((issue, index) => (
        <Message key={index} $severity={issue.severity}>
          {issue.severity === 'error' ? (
            <ErrorIcon width="16" height="16" />
          ) : (
            <WarningIcon width="16" height="16" />
          )}

          <MessageText>{issue.message}</MessageText>
        </Message>
      ))}
    </CheckerContainer>
  );
};

const CheckerContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 800px;
  align-self: center;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    gap: 0.375rem;
    padding: 0 1rem;
  }
`;

const Message = styled.div.attrs<{ $severity: 'error' | 'warning' }>(({ $severity }) => ({
  className: $severity,
}))`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  background: var(--surface-100);
  border-left: 0.125rem solid;

  .icon {
    margin: 0 0.25rem;
  }

  &.error {
    border-left-color: var(--red-700);
    background: var(--red-50);
    
    .icon * {
      fill: var(--red-700);
    }
  }

  &.warning {
    border-left-color: var(--yellow-700);
    background: var(--yellow-50);
    
    .icon * {
      fill: var(--yellow-700);
    }
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    
    .icon {
      margin: 0 0.25rem;
    }
  }
`;

const MessageText = styled.span`
  line-height: 1.3;
`;

export { ContrastChecker };
