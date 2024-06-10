import React from 'react';
import styled from 'styled-components';

interface Props {
  gradient: string;
  image: string;
  title: string;
  description: string;
  link: string;
}

const NeonCard: React.FC<Props> = ({ gradient, image, title, description, link }) => {
  return (
    <StyledLink href={link}>
      <StyledCard gradient={gradient}>
        <ImageContainer>
          <Image src={image} alt={title} />
        </ImageContainer>
        <Content>
          <TitleContainer>
            <Divider gradient={gradient} />
            <TitleText>{title}</TitleText>
            <Divider gradient={gradient} />
          </TitleContainer>
          <Description>{description}</Description>
        </Content>
      </StyledCard>
    </StyledLink>
  );
};

const StyledLink = styled.a`
  text-decoration: none;
`;

const StyledCard = styled.div<{ gradient: string }>`
  width: 20rem;
  height: 26rem;
  background: ${({ gradient }) => gradient};
  border-radius: 15px;
  padding: 1.2rem;
  text-align: center;
  color: var(--surface-700);
  box-shadow: 4px -4px 10px rgba(0, 0, 0, 0.3),
              8px -8px 15px rgba(0, 0, 0, 0.2),
              inset 0px 0px 10px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 8px -8px 20px rgba(0, 0, 0, 0.4),
                12px -12px 25px rgba(0, 0, 0, 0.3),
                inset 0px 0px 20px rgba(255, 255, 255, 0.2);
  }
`;

const ImageContainer = styled.div`
  border-top: 1px solid;
  border-right: 1px solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 1rem;
`;

const TitleText = styled.span`
  padding: 0 0.5rem;
  font-size: 1.2rem;
  color: var(--surface-700);
`;

const Divider = styled.div<{ gradient: string }>`
  height: 2px;
  background: ${({ gradient }) => gradient};
  flex: 1;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export { NeonCard };