import React from 'react';
import styled from 'styled-components';
import { checkContrast } from '@/utils/check-contrast';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import { CrossCircleIcon } from '@/components/icons/cross-circle';

interface ContrastStatusProps {
  textColor: string;
  bgColor: string;
}

const successColor = '#28a745';
const errorColor = '#dc3545';

const ContrastStatus: React.FC<ContrastStatusProps> = ({ textColor, bgColor }) => {
  const {
    contrast,
    isHeaderSuitableForAA,
    isHeaderSuitableForAAA,
    isTextSuitableForAA,
    isTextSuitableForAAA,
    isObjectSuitable
  } = checkContrast(textColor, bgColor);

  const getTitleStatus = () => (
    <>
      <Ratio>
        {isHeaderSuitableForAA ? (
          <CheckmarkIcon fill={successColor} />
        ) : (
          <CrossCircleIcon fill={errorColor} />
        )}
        <RatioText>Title AA — 3:1</RatioText>
      </Ratio>
      <Ratio>
        {isHeaderSuitableForAAA ? (
          <CheckmarkIcon fill={successColor} />
        ) : (
          <CrossCircleIcon fill={errorColor} />
        )}
        <RatioText>Title AAA — 4.5:1</RatioText>
      </Ratio>
    </>
  );

  const getDescriptionStatus = () => (
    <>
      <Ratio>
        {isTextSuitableForAA ? (
          <CheckmarkIcon fill={successColor} />
        ) : (
          <CrossCircleIcon fill={errorColor} />
        )}
        <RatioText>Description AA — 4.5:1</RatioText>
      </Ratio>
      <Ratio>
        {isTextSuitableForAAA ? (
          <CheckmarkIcon fill={successColor} />
        ) : (
          <CrossCircleIcon fill={errorColor} />
        )}
        <RatioText>Description AAA — 7:1</RatioText>
      </Ratio>
    </>
  );
  
  const getObjectStatus = () => (
    <>
      <Ratio>
        {isObjectSuitable ? (
          <CheckmarkIcon fill={successColor} />
        ) : (
          <CrossCircleIcon fill={errorColor} />
        )}
        <RatioText>Object AA — 3:1</RatioText>
      </Ratio>
    </>
  );

  return (
    <ContrastStatusContainer>
      <StatusHeader>
        <ContrastRatio>
          <RatioLabel>Ratio:</RatioLabel>
          <RatioValue>{contrast.toFixed(2)}:1</RatioValue>
        </ContrastRatio>
      </StatusHeader>
      
      <StatusSections>
        <ContrastSection>
          <SectionTitle>Title Contrast</SectionTitle>
          {getTitleStatus()}
        </ContrastSection>

        <ContrastSection>
          <SectionTitle>Description Contrast</SectionTitle>
          {getDescriptionStatus()}
        </ContrastSection>

        <ContrastSection>
          <SectionTitle>Object Contrast</SectionTitle>
          {getObjectStatus()}
        </ContrastSection>
      </StatusSections>
    </ContrastStatusContainer>
  );
};

const ContrastStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const ContrastRatio = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface-0);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--surface-200);
  
  @media (max-width: 600px) {
    align-self: stretch;
    justify-content: center;
  }
`;

const RatioLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--text-color);
`;

const RatioValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  font-family: monospace;
  color: var(--primary-color);
`;

const StatusSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContrastSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--surface-200);
`;

const Ratio = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatioText = styled.span`
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--text-color);
`;

export { ContrastStatus };
