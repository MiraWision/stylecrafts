import React from 'react';
import styled from 'styled-components';
import { checkContrast } from '@/utils/check-contrast';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import { CrossCircleIcon } from '@/components/icons/cross-circle';

interface ContrastStatusProps {
  textColor: string;
  bgColor: string;
}

const ContrastStatus: React.FC<ContrastStatusProps> = ({ textColor, bgColor }) => {
  const { contrast, isHeaderSuitableForAA, isHeaderSuitableForAAA, isTextSuitableForAA, isTextSuitableForAAA, isObjectSuitable } = checkContrast(textColor, bgColor);

  const getTitleStatus = () => (
    <>
      <Ratio>
        {isHeaderSuitableForAA ? (
          <CheckmarkIcon stroke="green" />
        ) : (
          <CrossCircleIcon stroke="red" />
        )}
        <RatioText>Title AA — 3:1</RatioText>
      </Ratio>
      <Ratio>
        {isHeaderSuitableForAAA ? (
          <CheckmarkIcon stroke="green" />
        ) : (
          <CrossCircleIcon stroke="red" />
        )}
        <RatioText>Title AAA — 4.5:1</RatioText>
      </Ratio>
    </>
  );

  const getDescriptionStatus = () => (
    <>
      <Ratio>
        {isTextSuitableForAA ? (
          <CheckmarkIcon stroke="green" />
        ) : (
          <CrossCircleIcon stroke="red" />
        )}
        <RatioText>Description AA — 4.5:1</RatioText>
      </Ratio>
      <Ratio>
        {isTextSuitableForAAA ? (
          <CheckmarkIcon stroke="green" />
        ) : (
          <CrossCircleIcon stroke="red" />
        )}
        <RatioText>Description AAA — 7:1</RatioText>
      </Ratio>
    </>
  );

  const getObjectStatus = () => (
    <>
      <Ratio>
        {isObjectSuitable ? (
          <CheckmarkIcon stroke="green" />
        ) : (
          <CrossCircleIcon stroke="red" />
        )}
        <RatioText>Object AA — 3:1</RatioText>
      </Ratio>
      <Ratio>
        {contrast >= 4.5 ? (
          <CheckmarkIcon stroke="green" />
        ) : (
          <CrossCircleIcon stroke="red" />
        )}
        <RatioText>Object AAA — 4.5:1</RatioText>
      </Ratio>
    </>
  );

  return (
    <ContrastStatusContainer>
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
    </ContrastStatusContainer>
  );
};

const ContrastStatusContainer = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
`;

const ContrastSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: #333333;
  font-weight: bold;
`;

const Ratio = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatioText = styled.span`
  font-size: 1rem;
  color: #333333;
`;

export { ContrastStatus };
