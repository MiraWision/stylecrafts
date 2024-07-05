import React, { useMemo } from 'react';
import styled from 'styled-components';

import { PaletteColor } from './types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExclamationTriangle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { checkContrast } from '@/utils/check-contrast';

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
          <Icon icon={issue.severity === 'error' ? faExclamationCircle : faExclamationTriangle} />

          {issue.message}
        </Message>
      ))}
    </CheckerContainer>
  );
};

const CheckerContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const Message = styled.div.attrs<{ $severity: 'error' | 'warning' }>(({ $severity }) => ({
  className: $severity,
}))`
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  ${Icon} {
    margin-right: 0.5rem;
  }

  .error {
    ${Icon} {
      color: var(--red-700);
    }
  }

  .warning {
    ${Icon} {
      color: var(--yellow-700);
    }
  }
`;

export { ContrastChecker };
