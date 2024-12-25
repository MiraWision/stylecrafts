import React, { useState } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';

import { CellShape, EyeShape, Settings } from './types';

import { ContentSettings } from './content-settings';
import { StyleSettings } from './style-settings';
import { QRCodeRenderer } from './qr-code-renderer';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { Label } from '@/components/ui/texts/label';
import { ImageInputMini, ImageData } from '@/components/ui/inputs/image-input-mini';
import { GenerateIcon } from '@/components/icons/generate';

const QRCodeGenerator = () => {
  const [content, setContent] = useState<string>('');
  const [qrMatrix, setQRMatrix] = useState<number[][]>([]);
  const [settings, setSettings] = useState<Settings>({
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    cellShape: CellShape.RoundedSquareSlight,
    eyeShape: EyeShape.RoundedSquare,
  });
  const [logo, setLogo] = useState<ImageData | null>(null);

  const generateQRCode = () => {
    if (!content) {
      return;
    }

    const qr = QRCode.create(content, { errorCorrectionLevel: 'H' });

    const modules = qr.modules;
    
    const matrix = [];

    for (let row = 0; row < modules.size; row++) {
      const rowData = [];

      for (let col = 0; col < modules.size; col++) {
        rowData.push(modules.get(row, col));
      }

      matrix.push(rowData);
    }

    setQRMatrix(matrix);
  };

  return (
    <Container>
      <ControlsSection>
        <ContentSettings
          setContent={setContent}
        />

        <BaseTextButton
          icon={<GenerateIcon width='24' height='24' />}
          text='Generate QR Code'
          onClick={generateQRCode}
          isPrimary
        />
      </ControlsSection>

      <DisplaySection>
        <Powered>
          Powered by QR8

          <img src='/logo/qr8-logo.png' alt='QR8 Logo' />  
        </Powered>

        <QRCodeRenderer
          qrMatrix={qrMatrix}
          settings={settings}
          logo={logo?.content ?? undefined}
        />
        
        <LogoField>
          <Label>Logo</Label>

          {logo ? (
            <SelectedLogo>
              <img src={logo.content ?? undefined} alt='Logo' />
              
              <RemoveLogoButton
                text='Remove'
                onClick={() => setLogo(null)}
              />
            </SelectedLogo>  
          ) : (
            <ImageInputMini
              value={null}
              onChange={setLogo}
            />
          )}
          
        </LogoField>

        <StyleSettings
          settings={settings}
          setSettings={setSettings}
        />
      </DisplaySection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const ControlsSection = styled.div`
  flex: 1;
`;

const DisplaySection = styled.div`
  flex: 1;
`;

const LogoField = styled.div`
  margin-bottom: 1rem;
`;

const SelectedLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  img {
    height: 2rem;
  }
`;

const RemoveLogoButton = styled(BaseTextButton)`
  height: 2rem;
  min-height: 2rem;
  font-size: 1rem;
`;

const Powered = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  margin-right: 2rem;
  font-size: 0.875rem;

  img {
    height: 1.25rem;
  }
`;

export { QRCodeGenerator };
