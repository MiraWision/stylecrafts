import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ImageType } from '@/types/image-types';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Slider } from 'primereact/slider';
import { LinkToggleButton } from '@/components/ui/buttons/link-toggle-button';

interface Settings {
  width: number;
  height: number;
  type: ImageType;
  quality: number;
}

interface Props {
  settings: Settings;
  onChange: (settings: Settings) => void;
  originalRatio: number;
}

const ImageTypes = [
  { label: 'PNG', value: ImageType.PNG },
  { label: 'JPEG', value: ImageType.JPEG },
  { label: 'WEBP', value: ImageType.WEBP },
];

const DefaultQuality = 80;

const ImageSettings: React.FC<Props> = ({ settings, onChange, originalRatio }) => {
  const [areLinkedDimensions, setAreLinkedDimensions] = useState<boolean>(true);

  useEffect(() => {
    if (areLinkedDimensions) {
      handleChange({ height: Math.round((settings.width ?? 1) / originalRatio) });
    }
  }, [originalRatio]);

  useEffect(() => {
    handleQualityChange(DefaultQuality);
  }, [settings.type]);

  const handleChange = (updates: Partial<Settings>) => {
    onChange({ ...settings, ...updates });
  };
  
  const handleWidthChange = (width: number) => {
    const updates: Partial<Settings> = { width };

    if (areLinkedDimensions) {
      updates.height = Math.round(width / originalRatio);
    }

    handleChange(updates);
  };

  const handleHeightChange = (height: number) => {
    const updates: Partial<Settings> = { height };

    if (areLinkedDimensions) {
      updates.width = Math.round(height * originalRatio);
    }

    handleChange(updates);
  };

  const handleTypeChange = (type: ImageType) => {
    handleChange({ type });
  };

  const handleQualityChange = (quality: number) => {
    handleChange({ quality });
  }

  return (
    <Container>
      <Row>
        <Field>
          <label>Width:</label>

          <InputNumber 
            value={settings.width} 
            onValueChange={(e) => handleWidthChange(e.value || 0)} 
          />
        </Field>

        <MiddleContainer>
          <LinkToggleButton 
            linked={areLinkedDimensions} 
            onToggle={() => setAreLinkedDimensions(!areLinkedDimensions)} 
          />
        </MiddleContainer>

        <Field>
          <label>Height:</label>

          <InputNumber 
            value={settings.height}
            onValueChange={(e) => handleHeightChange(e.value || 0)} 
          />
        </Field>
      </Row>

      <Row>
        <Field>
          <label>Image Type:</label>
          
          <Dropdown 
            value={settings.type} 
            options={ImageTypes} 
            onChange={(e) => handleTypeChange(e.value)}
          />
        </Field>

        {(settings.type === ImageType.JPEG || settings.type === ImageType.WEBP) && (
          <>
            <MiddleContainer />

            <Field>
              <label>Quality:</label>

              <SliderContainer>
                <QualityLabels>
                  <span>0</span>

                  <StyledSlider 
                    value={settings.quality}
                    onChange={(e) => handleQualityChange(e.value as number)}
                  />
                  
                  <span>100</span>
                </QualityLabels>

                <QualityValue>{settings.quality}</QualityValue>
              </SliderContainer>
            </Field>
          </>
        )}
      </Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem; 
  width: 100%;

  label {
    font-weight: bold;
  }

  input, select, .p-dropdown, .p-inputnumber, .p-slider {
    width: 100%;
  }
`;

const MiddleContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin-bottom: 0.5rem;
  min-width: 2rem;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const QualityLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 0 auto; 
`;

const StyledSlider = styled(Slider)`
  width: 80% !important;
  margin: 0 0.5rem;
`;

const QualityValue = styled.span`
  margin-top: 0.5rem;
`;

export { ImageSettings, DefaultQuality };

export type { Settings };