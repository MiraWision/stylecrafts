import React, { useState } from 'react';
import styled from 'styled-components';
import { copyText } from '@mirawision/copily';

import { content } from '@/content/legal-documents/support-us';
import { metaTags } from '@/content/meta-data/support-us';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { DocumentContainer } from '@/components/ui/containers';
import { Markdown } from '@/components/ui/texts/markdown';
import { CopyIcon } from '@/components/icons/copy';
import { CheckmarkIcon } from '@/components/icons/checkmark';

const CryptoWallets = [
  {
    id: 'btc',
    label: 'Bitcoin',
    symbol: 'BTC',
    address: 'bc1q0dgvk4fep38cmc7xvzh6j6snndn072fdhwasvt',
    qrCode: '/crypto-wallets/btc.jpeg',
  },
  {
    id: 'eth',
    label: 'Ethereum',
    symbol: 'ETH',
    address: '0x22a8a01e170BaEb0F98259F5865912EC151954ec',
    qrCode: '/crypto-wallets/eth.jpeg',
  },
  {
    id: 'sol',
    label: 'Solana',
    symbol: 'SOL',
    address: 'BXLrATm9wJjDcb6qxZWNuRrh6X8sLHNE3sqaupz6KgBN',
    qrCode: '/crypto-wallets/sol.jpeg',
  },
  {
    id: 'usdt',
    label: 'USDT (TRC20)',
    symbol: 'USDT',
    address: 'TQb1eqtJSiiYkcqscLyAdwkWHJWiZ8KRv9',
    qrCode: '/crypto-wallets/usdt.jpeg',
  },
];

const CryptoWalletCard: React.FC<{ wallet: typeof CryptoWallets[0] }> = ({ wallet }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  return (
    <WalletCard>
      <WalletHeader>
        <WalletSymbol>{wallet.symbol}</WalletSymbol>
        <WalletLabel>{wallet.label}</WalletLabel>
      </WalletHeader>
      
      <QRCodeContainer>
        <img 
          src={wallet.qrCode} 
          alt={`${wallet.label} QR Code`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }}
        />
      </QRCodeContainer>
      
      <AddressContainer onClick={handleCopy} title="Click to copy address">
        <WalletAddress>{wallet.address}</WalletAddress>
        <CopyIconContainer>
          {copied ? (
            <CheckmarkIcon width="16" height="16" fill="var(--success-color)" />
          ) : (
            <CopyIcon width="16" height="16" />
          )}
        </CopyIconContainer>
      </AddressContainer>
    </WalletCard>
  );
};

const SupportUsPage: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <DocumentContainer>
        <Markdown markdownText={content} />

        <CryptoWalletsGrid>
          {CryptoWallets.map((wallet) => (
            <CryptoWalletCard key={wallet.id} wallet={wallet} />
          ))}
        </CryptoWalletsGrid>
      </DocumentContainer>
    </BaseLayout>
  );
};

const CryptoWalletsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const WalletCard = styled.div`
  background: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
`;

const WalletHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const WalletSymbol = styled.span`
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--primary-color);
`;

const WalletLabel = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const QRCodeContainer = styled.div`
  width: 10rem;
  height: 10rem;
  margin: 0 auto 1rem;
  background: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 0.75rem;
`;

const AddressContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--surface-hover);
    border-color: var(--primary-color);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const WalletAddress = styled.span`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-color);
  word-break: break-all;
  flex: 1;
  text-align: left;
`;

const CopyIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  
  ${AddressContainer}:hover & {
    color: var(--primary-color);
  }
`;

export default SupportUsPage;
