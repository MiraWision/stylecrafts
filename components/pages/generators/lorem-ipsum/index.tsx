import React, { useState } from 'react';
import styled from 'styled-components';

import { generateLoremIpsum } from '@/utils/lorem-ipsum';

const MainLoremIpsumGenerator: React.FC = () => {
  const [type, setType] = useState<'sentences' | 'paragraphs'>('sentences');
  const [count, setCount] = useState<number>(5);
  const [content, setContent] = useState<string>('');

  const handleGenerate = () => {
    const generated = generateLoremIpsum(type, count);
    setContent(generated);
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Container>
      {content && (
        <ContentContainer>
          <ContentText>{content}</ContentText>
          <CopyButton onClick={copyContent}>Copy</CopyButton>
        </ContentContainer>
      )}
      <Form>
        <FormRow>
          <Label htmlFor="type">Content Type:</Label>
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'sentences' | 'paragraphs')}
          >
            <option value="sentences">Sentences</option>
            <option value="paragraphs">Paragraphs</option>
          </Select>
        </FormRow>
        <FormRow>
          <Label htmlFor="count">Number:</Label>
          <Input
            id="count"
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </FormRow>
        <GenerateButton onClick={handleGenerate}>Generate</GenerateButton>
      </Form>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ContentText = styled.pre`
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  flex: 1;
  white-space: pre-wrap;
`;

const CopyButton = styled.button`
  margin-left: 16px;
  padding: 8px 16px;
  cursor: pointer;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Label = styled.label`
  margin-right: 8px;
  width: 120px;
`;

const Select = styled.select`
  padding: 4px;
  width: 150px;
`;

const Input = styled.input`
  width: 60px;
  padding: 4px;
`;

const GenerateButton = styled.button`
  padding: 8px 16px;
  cursor: pointer;
`;

export { MainLoremIpsumGenerator };