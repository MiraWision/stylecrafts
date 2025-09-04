import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { adjustBrightness } from '@mirawision/colorize';

import { PaletteColor } from '../types';

import { HeartIcon } from '@/components/icons/heart';
import { AddToCart } from '@/components/icons/add-to-cart';
import { Star } from '@/components/icons/star';

interface ProductData {
  name: string;
  colorOptions: { color: string; hex: string; images: string[] }[];
  storageOptions: { size: number; label: string; price: number; available: boolean }[];
  modelId: string;
  rating: number;
  reviewsCount: number;
}

interface Props {
  data: ProductData;
  palette: PaletteColor[];
}

const ProductPreview: React.FC<Props> = ({ data, palette }) => {
  const [selectedColor, setSelectedColor] = useState<string>(data.colorOptions[0].color);
  const colorObj = data.colorOptions.find(c => c.color === selectedColor) ?? data.colorOptions[0];
  const [selectedImage, setSelectedImage] = useState<string>(colorObj.images[0]);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(data.storageOptions[0]?.size ?? null);

  useEffect(() => {
    setSelectedImage(colorObj.images[0]);
  }, [selectedColor]);

  const primary = palette.find(c => c.title === 'Primary')?.baseColor ?? '#3468db';
  const accent = palette.find(c => c.title === 'Accent')?.baseColor  ?? '#e74c3c';
  const text = palette.find(c => c.title === 'Text')?.baseColor    ?? '#333333';
  const background = palette.find(c => c.title === 'Background')?.baseColor ?? '#f5f5f5';
  
  const primaryLight = adjustBrightness(primary, 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const currentPrice =
    data.storageOptions.find(o => o.size === selectedStorage)?.price ??
    data.storageOptions[0]?.price ??
    0;

  return (
    <ProductContainer $backgroundColor={background}>
      <Form onSubmit={handleSubmit}>
        <ImageSection>
          <MainImage src={selectedImage} alt={data.name} />
          <ThumbnailWrapper>
            {colorObj.images.map((img, idx) => (
              <Thumbnail
                key={idx}
                src={img}
                isActive={img === selectedImage}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </ThumbnailWrapper>
        </ImageSection>

        <DetailsWrapper>
          <TitleWrapper>
            <ProductTitle $color={text}>
              {data.name}
            </ProductTitle>
            <ModelId $color={text}>ID: {data.modelId}</ModelId>
          </TitleWrapper>

          <RatingWrapper>
            <StarRating>
              {Array.from({ length: 5 }, (_, i) => {
                const fraction = Math.min(Math.max(data.rating - i, 0), 1);
                return <Star key={i} filled={fraction} />;
              })}
            </StarRating>
            <ReviewCount $color={text}>
              ({data.rating} / {data.reviewsCount} reviews)
            </ReviewCount>
          </RatingWrapper>

          <Price $color={primary}>
            ${currentPrice.toFixed(2)}
          </Price>

          <ColorOptions>
            <ColorLabel $color={text}>Color:</ColorLabel>
            <ColorsWrapper>
              {data.colorOptions.map((opt, idx) => (
                <ColorCircle
                  key={idx}
                  color={opt.hex}
                  isActive={opt.color === selectedColor}
                  onClick={() => setSelectedColor(opt.color)}
                  title={opt.color}
                />
              ))}
            </ColorsWrapper>
          </ColorOptions>

          <SizeOptions>
            <StorageLabel $color={text}>Storage:</StorageLabel>
            <SizesWrapper>
              {data.storageOptions.map((opt, idx) => (
                <SizeBox
                  key={idx}
                  $disabled={!opt.available}
                  $isSelected={opt.size === selectedStorage}
                  onClick={() => opt.available && setSelectedStorage(opt.size)}
                  $backgroundColor={primary}
                  $textColor={text}
                >
                  {opt.label}
                </SizeBox>
              ))}
            </SizesWrapper>
          </SizeOptions>

          <ButtonContainer>
            <CartButton type="submit" $backgroundColor={primary} $hoverBackgroundColor={primaryLight}>
              <AddToCart width="16" height="16" />
              Add to cart
            </CartButton>
            <FavoriteButton type="button" $borderColor={primary} $color={primary} $hoverColor={primaryLight}>
              <HeartIcon width="16" height="16" />
            </FavoriteButton>
          </ButtonContainer>
        </DetailsWrapper>
      </Form>
    </ProductContainer>
  );
};

const ProductContainer = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
  border-radius: 0.5rem;
  min-height: 100%;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 0.5rem;
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const Thumbnail = styled.img<{ isActive: boolean }>`
  width: 60px;
  height: 60px;
  margin-right: 5px;
  border: 2px solid ${({ isActive }) => (isActive ? 'var(--text-color)' : 'transparent')};
  border-radius: 0.25rem;
  cursor: pointer;
  transition: border 0.3s;
`;

const DetailsWrapper = styled.div`
  flex: 2;
  padding-left: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModelId = styled.div<{ $color: string }>`
  font-size: 12px;
  color: ${({ $color }) => $color};
`;

const ProductTitle = styled.h1<{ $color: string }>`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ $color }) => $color};
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StarRating = styled.div`
  display: flex;
`;

const ReviewCount = styled.span<{ $color: string }>`
  font-size: 0.875rem;
  margin-left: 10px;
  color: ${({ $color }) => $color};
`;

const Price = styled.div<{ $color: string }>`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${({ $color }) => $color};
`;

const ColorOptions = styled.div`
  margin-bottom: 20px;
`;

const ColorLabel = styled.label<{ $color: string }>`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${({ $color }) => $color};
`;

const ColorsWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const ColorCircle = styled.div<{ color: string; isActive: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid ${({ isActive }) => (isActive ? 'var(--surface-500)' : 'var(--surface-border)')};
`;

const SizeOptions = styled.div`
  margin-bottom: 20px;
`;

const StorageLabel = styled.label<{ $color: string }>`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ $color }) => $color};
`;

const SizesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SizeBox = styled.div<{ $isSelected: boolean; $disabled: boolean; $backgroundColor: string; $textColor: string }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 4px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s;
  border: ${({ $backgroundColor }) => `1px solid ${$backgroundColor}`};
  background-color: ${({ $isSelected, $backgroundColor }) => $isSelected ? $backgroundColor : 'transparent'};
  color: ${({ $isSelected, $textColor }) => $isSelected ? 'var(--surface-0)' : $textColor};
  filter: ${({ $disabled }) => ($disabled ? 'grayscale(100%)' : 'none')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CartButton = styled.button<{ $backgroundColor: string, $hoverBackgroundColor: string }>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 0.875rem;
  color: var(--surface-0);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  max-width: 120px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  &:hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
  }

  .icon {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    
    * {
      fill: var(--surface-0);
    }
  }
`;

const FavoriteButton = styled.button<{ $borderColor: string; $color: string; $hoverColor: string }>`
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: 1px solid;
  border-color: ${({ $borderColor }) => $borderColor};
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;

  .icon {
    width: 16px;
    height: 16px;

    * {
      fill: ${({ $color }) => $color};
    }
  }

  &:hover {
    background-color: ${({ $hoverColor }) => $hoverColor};

    * {
      fill: var(--surface-0);
    }
  }
`;

export { ProductPreview };
