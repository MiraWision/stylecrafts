import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/support-us';

const SUPPORT_OPTIONS = [
  {
    label: 'Buy Me a Coffee',
    url: 'https://www.buymeacoffee.com/', // Замените на вашу ссылку
    type: 'coffee',
  },
  {
    label: 'Bitcoin',
    value: 'bc1qexampleaddress',
    type: 'crypto',
  },
  {
    label: 'Ethereum',
    value: '0xExampleEthereumAddress',
    type: 'crypto',
  },
  {
    label: 'USDT (TRC20)',
    value: 'TExampleTRC20Address',
    type: 'crypto',
  },
];

const SupportUsSection: React.FC = () => {
  const [modal, setModal] = useState<null | { type: string; label: string; url?: string; value?: string }>(null);
  const [copied, setCopied] = useState(false);

  const handleSupportClick = (option: any) => {
    setModal(option);
    setCopied(false);
  };

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <SectionContainer>
      <ContentContainer>
        <LeftBlock>
          <Title>Support Us</Title>
          <Description>
            If you enjoy our project and want to help it grow, you can support us in several ways! Your contribution helps us add new features, improve the platform, and keep it free for everyone.
          </Description>
          <SupportOptions>
            {SUPPORT_OPTIONS.map((option) => (
              option.type === 'coffee' ? (
                <SupportLink as="button" key={option.label} onClick={() => handleSupportClick(option)}>
                  {option.label}
                </SupportLink>
              ) : (
                <SupportWalletButton key={option.label} onClick={() => handleSupportClick(option)}>
                  <WalletLabel>{option.label}:</WalletLabel>
                  <WalletValue>{option.value}</WalletValue>
                </SupportWalletButton>
              )
            ))}
          </SupportOptions>
          <MoreContent>
            <p>Thank you for your support! 💜</p>
          </MoreContent>
        </LeftBlock>
      </ContentContainer>
      {modal && (
        <ModalOverlay onClick={() => setModal(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            {modal.type === 'coffee' ? (
              <>
                <ModalTitle>Поддержать через Buy Me a Coffee</ModalTitle>
                <ModalText>Вы будете перенаправлены на Buy Me a Coffee для завершения платежа.</ModalText>
                <ModalButton as="a" href={modal.url} target="_blank" rel="noopener noreferrer">Перейти к оплате</ModalButton>
                <ModalButton onClick={() => setModal(null)} $secondary>Отмена</ModalButton>
              </>
            ) : (
              <>
                <ModalTitle>Кошелёк {modal.label}</ModalTitle>
                <ModalText>Скопируйте адрес для перевода:</ModalText>
                <ModalWallet>{modal.value}</ModalWallet>
                <ModalButton onClick={() => handleCopy(modal.value!)}>{copied ? 'Скопировано!' : 'Скопировать адрес'}</ModalButton>
                <ModalButton onClick={() => setModal(null)} $secondary>Закрыть</ModalButton>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </SectionContainer>
  );
};

const SupportUs = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />
      <SupportUsSection />
    </BaseLayout>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  min-height: calc(100vh - 3rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  width: 80%;
  max-width: 700px;
  border-radius: 1.5rem;
  box-shadow: 0 0 2rem 0 rgba(0,0,0,0.07);
  padding: 2.5rem 2rem;
  gap: 2.5rem;
  margin: 3rem 0;

  @media (max-width: 900px) {
    flex-direction: column;
    width: 95%;
    padding: 2rem 1rem;
    gap: 1.5rem;
  }
`;

const LeftBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
`;

const Title = styled.h1`
  font-family: 'Montagu Slab', serif;
  font-size: 2.5rem;
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: var(--text-color);
  margin: 0 0 1.5rem 0;
`;

const SupportOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SupportLink = styled.button`
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  padding: 0.9rem 1.2rem;
  text-decoration: none;
  width: fit-content;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #7e4fd4;
  }
`;

const SupportWalletButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
  background: #fafbfc;
  border-radius: 0.5rem;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f0e6ff;
  }
`;

const WalletLabel = styled.span`
  font-weight: 600;
  color: var(--primary-color);
`;

const WalletValue = styled.span`
  color: var(--text-color);
  font-family: monospace;
`;

const MoreContent = styled.div`
  margin-top: 2rem;
  color: var(--text-color);
  font-size: 1.05rem;
`;

// Модальные окна
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2.5rem 2rem 2rem 2rem;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 4px 32px rgba(0,0,0,0.13);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModalTitle = styled.h2`
  margin: 0 0 1.2rem 0;
  color: var(--primary-color);
  font-size: 1.5rem;
`;
const ModalText = styled.p`
  color: var(--text-color);
  margin-bottom: 1.2rem;
  text-align: center;
`;
const ModalWallet = styled.div`
  font-family: monospace;
  background: #fafbfc;
  border-radius: 0.5rem;
  padding: 0.7rem 1rem;
  margin-bottom: 1.2rem;
  word-break: break-all;
`;
const ModalButton = styled.button<{ $secondary?: boolean }>`
  background: ${({ $secondary }) => $secondary ? '#f3f3f3' : 'var(--primary-color)'};
  color: ${({ $secondary }) => $secondary ? 'var(--text-color)' : '#fff'};
  font-weight: 600;
  font-size: 1.05rem;
  border-radius: 0.5rem;
  padding: 0.7rem 1.2rem;
  border: none;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background: ${({ $secondary }) => $secondary ? '#ececec' : '#7e4fd4'};
  }
`;

export default SupportUs;
