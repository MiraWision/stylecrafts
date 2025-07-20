import React, { useState } from 'react';
import styled from 'styled-components';
import { HeartIcon } from '@/components/icons/heart';
import { AddToCart } from '@/components/icons/add-to-cart';
import { Star } from '@/components/icons/star';
import { PaletteColor } from '../types';

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

  React.useEffect(() => {
    setSelectedImage(colorObj.images[0]);
  }, [selectedColor]);

  const primaryColor = palette.find(c => c.title === 'Primary')?.baseColor ?? '#3468db';
  const accentColor  = palette.find(c => c.title === 'Accent')?.baseColor  ?? '#e74c3c';
  const textColor    = palette.find(c => c.title === 'Text')?.baseColor    ?? '#333333';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStorage === null) {
      alert('Please select a storage option before adding to cart.');
      return;
    }
    console.log({
      name: data.name,
      storage: selectedStorage,
      color: selectedColor,
      modelId: data.modelId,
      price: data.storageOptions.find(o => o.size === selectedStorage)?.price
    });
  };

  const currentPrice =
    data.storageOptions.find(o => o.size === selectedStorage)?.price ??
    data.storageOptions[0]?.price ??
    0;

  return (
    <ProductContainer>
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
            <ProductTitle style={{ color: textColor }}>
              {data.name}
            </ProductTitle>
            <ModelId>ID: {data.modelId}</ModelId>
          </TitleWrapper>

          <RatingWrapper>
            <StarRating>
              {Array.from({ length: 5 }, (_, i) => {
                const fraction = Math.min(Math.max(data.rating - i, 0), 1);
                return <Star key={i} filled={fraction} />;
              })}
            </StarRating>
            <ReviewCount>
              ({data.rating} / {data.reviewsCount} reviews)
            </ReviewCount>
          </RatingWrapper>

          <Price style={{ color: accentColor }}>
            ${currentPrice.toFixed(2)}
          </Price>

          <ColorOptions>
            <label>Color:</label>
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
            <label>Storage:</label>
            <SizesWrapper>
              {data.storageOptions.map((opt, idx) => (
                <SizeBox
                  key={idx}
                  type="button"
                  disabled={!opt.available}
                  isSelected={opt.size === selectedStorage}
                  onClick={() => opt.available && setSelectedStorage(opt.size)}
                  style={{
                    backgroundColor:
                      opt.size === selectedStorage ? primaryColor : '#fff',
                    color:
                      opt.size === selectedStorage ? '#fff' : textColor,
                  }}
                >
                  {opt.label}
                </SizeBox>
              ))}
            </SizesWrapper>
          </SizeOptions>

          <ButtonContainer>
            <CartButton type="submit" style={{ backgroundColor: primaryColor }}>
              <AddToCart width="16" height="16" />
              Add to cart
            </CartButton>
            <FavoriteButton type="button">
              <HeartIcon width="16" height="16" />
            </FavoriteButton>
          </ButtonContainer>
        </DetailsWrapper>
      </Form>
    </ProductContainer>
  );
};

const StarWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-block;
`;

const FilledClip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
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
  margin-top: 10px;
`;

const Thumbnail = styled.img<{ isActive: boolean }>`
  width: 60px;
  height: 60px;
  margin-right: 5px;
  border: 2px solid ${({ isActive }) => (isActive ? '#000' : 'transparent')};
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

const ModelId = styled.div`
  font-size: 12px;
  color: gray;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StarRating = styled.div`
  display: flex;
`;

const ReviewCount = styled.span`
  font-size: 0.875rem;
  margin-left: 10px;
  color: #555;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ColorOptions = styled.div`
  margin-bottom: 20px;
`;

const ColorsWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ColorCircle = styled.div<{ color: string; isActive: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid ${({ isActive }) => (isActive ? '#000' : '#ddd')};
`;

const SizeOptions = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
`;

const SizesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SizeBox = styled.button<{ isSelected: boolean; disabled: boolean }>`
  padding: 6px 12px;
  font-size: 0.875rem;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;
  border: ${({ isSelected }) => (isSelected ? 'none' : '1px solid #ccc')};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const CartButton = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 0.875rem;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
  max-width: 120px;
  svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  &:hover {
    background-color: #333;
  }
`;

const FavoriteButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: #f5f5f5;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
  svg {
    width: 16px;
    height: 16px;
  }
  &:hover {
    background-color: #e5e5e5;
  }
`;

export { ProductPreview };
