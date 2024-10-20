import React, { useState } from 'react';
import styled from 'styled-components';
import { HeartIcon } from '@/components/icons/heart';
import { AddToCart } from '@/components/icons/add-to-cart';
import { StarIcon } from '@/components/icons/star';
import { PaletteColor } from '../types';

interface ProductData {
  name: string;
  price: number;
  imageUrl: string[];
  colorOptions: { color: string, hex: string }[];
  sizeOptions: { size: number, available: boolean }[];
  modelId: string;
  rating: number;
  reviewsCount: number;
}

interface Props {
  data: ProductData;
  palette: PaletteColor[];
}

const ProductPreview: React.FC<Props> = ({ data, palette }) => {
  const [selectedImage, setSelectedImage] = useState(data.imageUrl[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(data.colorOptions[0].color);

  const primaryColor = palette.find(color => color.title === 'Primary')?.baseColor || '#3468db';
  const accentColor = palette.find(color => color.title === 'Accent')?.baseColor || '#e74c3c';
  const textColor = palette.find(color => color.title === 'Text')?.baseColor || '#333333';
  const backgroundColor = palette.find(color => color.title === 'Background')?.baseColor || '#f5f5f5';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedSize === null) {
      alert('Please select a size before adding to cart.');
      return;
    }

    const selectedProduct = {
      name: data.name,
      price: data.price,
      size: selectedSize,
      color: selectedColor,
      modelId: data.modelId,
    };

    console.log(selectedProduct);
  };

  return (
    <ProductContainer>
      <Form onSubmit={handleSubmit}>

        <ImageSection>
          <MainImage src={selectedImage} alt={data.name} />

          <ThumbnailWrapper>
            {data.imageUrl.map((img, index) => (
              <Thumbnail
                key={index}
                src={img}
                onClick={() => setSelectedImage(img)}
                isActive={selectedImage === img}
              />
            ))}
          </ThumbnailWrapper>
        </ImageSection>

        <DetailsWrapper>
          <TitleWrapper>
            <ProductTitle style={{ color: textColor }}>{data.name}</ProductTitle>
            <ModelId>ID: {data.modelId}</ModelId>
          </TitleWrapper>

          <RatingWrapper>
            <StarRating>
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon key={index} width="24" height="24" fill="#FFD700" />
              ))}
            </StarRating>
            <ReviewCount>({data.rating} / {data.reviewsCount} reviews)</ReviewCount>
          </RatingWrapper>

          <Price style={{ color: accentColor }}>${data.price.toFixed(2)}</Price>

          <ColorOptions>
            <label>Color:</label>
            <ColorsWrapper>
              {data.colorOptions.map((color, index) => (
                <ColorCircle
                  key={index}
                  color={color.hex}
                  title={color.color}
                  onClick={() => setSelectedColor(color.color)}
                  isActive={selectedColor === color.color}
                />
              ))}
            </ColorsWrapper>
          </ColorOptions>

          <SizeOptions>
            <label>Size:</label>
            <SizesWrapper>
              {data.sizeOptions.map((sizeOption, index) => (
                <SizeBox
                  key={index}
                  isSelected={selectedSize === sizeOption.size}
                  disabled={!sizeOption.available}
                  onClick={() => sizeOption.available && setSelectedSize(sizeOption.size)}
                  style={{
                    backgroundColor: selectedSize === sizeOption.size ? primaryColor : '#fff',
                    color: selectedSize === sizeOption.size ? '#fff' : textColor,
                  }}
                >
                  {sizeOption.size}
                </SizeBox>
              ))}
            </SizesWrapper>
          </SizeOptions>

          <ButtonContainer>
            <CartButton type="submit" style={{ backgroundColor: primaryColor }}>
              <AddToCart width="24" height="24" />
              Add to cart
            </CartButton>
            <FavoriteButton type="button">
              <HeartIcon width="24" height="24" />
            </FavoriteButton>
          </ButtonContainer>
        </DetailsWrapper>
      </Form>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
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
  gap: 0;
  align-items: center;

  svg {
    margin-right: -2px;
  }
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
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid ${({ isActive }) => (isActive ? '#000' : '#ddd')};
`;

const SizeOptions = styled.div`
  margin-bottom: 20px;
`;

const SizesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SizeBox = styled.button<{ isSelected: boolean; disabled: boolean }>`
  padding: 10px;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#000' : '#ccc')};
  border-radius: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const CartButton = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 150px;
  text-align: center;
  font-size: 1rem;

  &:hover {
    background-color: #333;
  }

  svg {
    margin-right: 8px;
  }
`;

const FavoriteButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: #f5f5f5;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e5e5e5;
  }
`;

export { ProductPreview };