import React from 'react';
import styled from 'styled-components';
import { calculateContrast } from '@/utils/color-contrast';

interface ContrastStatusProps {
  textColor: string;
  bgColor: string;
  isDescription: boolean;
  isBackground: boolean;
}

const ContrastStatus: React.FC<ContrastStatusProps> = ({
  textColor,
  bgColor,
  isDescription,
}) => {
  const { contrast, isSuitableForAA, isSuitableForAAA } = calculateContrast(textColor, bgColor);
  
  const aaThreshold = isDescription ? 4.5 : 3.0;
  const aaaThreshold = isDescription ? 7.0 : 4.5;

  const isAA = contrast >= aaThreshold;
  const isAAA = contrast >= aaaThreshold;

  const getStatusMessage = () => {
    if (isDescription) {
      return isAA && isAAA ? 'Suitable for description!' : 'Not suitable for description!';
    }
    return isAA && isAAA ? 'Suitable for the title!' : 'Not suitable for the title!';
  };

  const getContrastRatios = () => (
    <>
      <Ratio>
        <RatioIcon className={`pi ${isAA ? 'pi-check' : 'pi-exclamation-circle'}`} $isSuitable={isAA} />
        <RatioText>AA — {aaThreshold}:1</RatioText>
      </Ratio>
      <Ratio>
        <RatioIcon className={`pi ${isAAA ? 'pi-check' : 'pi-exclamation-circle'}`} $isSuitable={isAAA} />
        <RatioText>AAA — {aaaThreshold}:1</RatioText>
      </Ratio>
    </>
  );

  return (
    <ContrastStatusContainer>
      <StatusMessage $isSuitable={isAA && isAAA}>{getStatusMessage()}</StatusMessage>
      <ContrastRatios>{getContrastRatios()}</ContrastRatios>
    </ContrastStatusContainer>
  );
};

const ContrastStatusContainer = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StatusMessage = styled.p<{ $isSuitable: boolean }>`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ $isSuitable }) => ($isSuitable ? 'green' : 'red')};
  margin: 0;
`;

const ContrastRatios = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
`;

const Ratio = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatioIcon = styled.i<{ $isSuitable: boolean }>`
  color: ${({ $isSuitable }) => ($isSuitable ? 'green' : 'red')};
  font-size: 1.5rem;
`;

const RatioText = styled.span`
  font-size: 1rem;
  color: #333;
`;

export  { ContrastStatus };