import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { BaseLayout } from '@/layouts/base-layout';
import { Header1, Header2 } from '@/components/templates/headers-template';
import { NPMLink } from '@/components/common/npm-link';
import { ColorInput } from '@/components/common/color-input';
import { Label } from '@/components/common/label';
import { ColorsOutput } from '@/components/common/colors-output';
import { generateSteppedGradient, generateMultiSteppedGradient } from '@mirawision/colorize';

const Colors = [
  '#FF5733',
  '#3498DB',
  '#8E44AD',
  '#16A085',
  '#F1C40F',
  '#E74C3C',
  '#2ECC71',
  '#D35400',
  '#7F8C8D',
  '#2980B9',
];

const getRandomElements = (arr: any[], count: number) => {
  let shuffled = arr.slice();

  for (let i = 0; i < count; i++) {
    let j = i + Math.floor(Math.random() * (shuffled.length - i));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

const [firstColor, secondColor] = getRandomElements(Colors, 2);

const ColorsMixer = () => {
  const [color1, setColor1] = useState<string>(firstColor);
  const [color2, setColor2] = useState<string>(secondColor);
  const [steps, setSteps] = useState<number>(5);
  const [intermediateColors, setIntermediateColors] = useState<string[]>([]);
  const [intermediateMultiColors, setIntermediateMultiColors] = useState<string[]>([]);
  
  useEffect(() => {
    try {
      const newColors = generateSteppedGradient(color1, color2, steps);
      setIntermediateColors(newColors);
    } catch (error) {
      console.error(error);
    }
  }, [color1, color2, steps]); 

  const onChangeSteps = ({ value }: InputNumberChangeEvent) => {
    if (!value) {
      return;
    }

    if (value < 1) {
      value = 1;
    } else if (value > 25) {
      value = 25;
    }

    setSteps(value);
  };

  const [colorSteps, setColorSteps] = useState<Array<{ color: string; steps: number }>>([
    { color: '#3498DB', steps: 3 },
    { color: '#8E44AD', steps: 4 },
  ]);

  useEffect(() => {
    try {
      const gradientArgs = colorSteps.flatMap(({ color, steps }, index) => 
        index < colorSteps.length - 1 ? [color, steps] : [color]
      );
      const newColors = generateMultiSteppedGradient(...gradientArgs);
      setIntermediateMultiColors(newColors);
    } catch (error) {
      console.error(error);
    }
  }, [colorSteps]);

  const addColorStep = () => {
    setColorSteps([...colorSteps, { color: '#FFFFFF', steps: 2 }]);
  };

  const updateColor = (index: number, newColor: string) => {
    const newColorSteps = [...colorSteps];
    newColorSteps[index]. color = newColor;
    setColorSteps(newColorSteps);
  };

  const updateSteps = (index: number, newSteps: number) => {
    const newColorSteps = [...colorSteps];
    newColorSteps[index].steps = newSteps;
    setColorSteps(newColorSteps);
  };

  return (
    <BaseLayout>
      <Header1 centered>Colors Mixer</Header1>
      <Header2 centered>Select 2 Colors and get Intermediate Colors between them</Header2>

      <Grid>
        <div>
          <Label>Color 1</Label>
          <StyledColorInput value={color1} onChange={setColor1} />

          <Label>Color 2</Label>
          <StyledColorInput value={color2} onChange={setColor2} />

          <Label>Number of Intermediate Colors (1 - 25)</Label>
          <InputNumberStyled 
            value={steps} 
            onChange={onChangeSteps} 
            showButtons
            min={1}
            max={25}  
          />
        </div>

        <ColorsOutput colors={intermediateColors} />
      </Grid>

      <Header1 centered>Gradient Mixer</Header1>
      <Header2 centered>Create a Multi-Stepped Gradient</Header2>

      <Grid>
        <div>
          {colorSteps.map((item, index) => (
            <div key={index}>
              <Label>{`Color ${index + 1}`}</Label>
              <ColorInput
                value={item.color}
                onChange={(newColor) => updateColor(index, newColor)}
              />

              {index < colorSteps.length - 1 && (
                <>
                  <Label>{`Steps to Color ${index + 2}`}</Label>
                  <InputNumberStyled 
                    value={item.steps} 
                    onChange={(e) => updateSteps(index, e.value || 0)}
                    showButtons
                    min={1}
                    max={25}
                  />
                </>
              )}
            </div>
          ))}
          <AddColorButton onClick={addColorStep}>+ Add Color</AddColorButton>
        </div>

        <ColorsOutput colors={intermediateMultiColors} />
      </Grid>
      
      <NPMLink 
        text='Need to have color tools like these in you app? Feel free to use our NPM package'
        packageName='@mirawision/colorize'
      />
    </BaseLayout>
  );
};

export default ColorsMixer;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 12px;
  width: 640px;
  margin: 24px auto;
`;

const InputNumberStyled = styled(InputNumber)`
  width: 201px;
`;

const StyledColorInput = styled(ColorInput)`
  margin-top: 10px;
`;

const AddColorButton = styled.button`
  margin-top: 20px;
  cursor: pointer;
`;