import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { GoToAppIcon } from '@/components/icons/go-to-app';
import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/contact-us';

const ContactUsSection: React.FC = () => {
  const [lastSubmit, setLastSubmit] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const now = Date.now();
    if (honeypotRef.current && honeypotRef.current.value) {
      setError('Spam detected.');
      return;
    }
    if (now - lastSubmit < 30000) {
      setError('Пожалуйста, подождите перед повторной отправкой.');
      return;
    }
    setLastSubmit(now);
    setSuccess('Ваше сообщение отправлено!');
    // Здесь должна быть реальная отправка данных
  };

  return (
    <SectionContainer>
      <ContentContainer>
        <LeftBlock>
          <Title>Contact Us</Title>
          <Description>
            Have questions, suggestions, or want to collaborate? Fill out the form or reach us directly — we'll get back to you soon!
          </Description>
          <ContactInfo>
            <InfoItem>
              <Label>Email:</Label>
              <Value>info@example.com</Value>
            </InfoItem>
            <InfoItem>
              <Label>Telegram:</Label>
              <Value>@example_support</Value>
            </InfoItem>
            <InfoItem>
              <Label>GitHub:</Label>
              <Value>github.com/example</Value>
            </InfoItem>
          </ContactInfo>
        </LeftBlock>
        <RightBlock>
          <Form onSubmit={handleSubmit} autoComplete="off">

            <HoneypotInput ref={honeypotRef} name="website" tabIndex={-1} autoComplete="off" placeholder="Leave this field empty" />
            <Input type="text" placeholder="Your Name" name="name" required />
            <Input type="email" placeholder="Your Email" name="email" required />
            <Textarea placeholder="Your Message" name="message" rows={5} required />
            <SubmitButton type="submit">
              Send Message <GoToAppIcon width="1.2em" height="1.2em" />
            </SubmitButton>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {success && <SuccessMsg>{success}</SuccessMsg>}
          </Form>
        </RightBlock>
      </ContentContainer>
    </SectionContainer>
  );
};

const ContactUs = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />
      <ContactUsSection />
    </BaseLayout>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  min-height: calc(100vh - 3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: var(--surface-0, #fff); */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  width: 80%;
  max-width: 900px;
  /* background: rgba(255,255,255,0.95); */
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
  flex: 1.2;
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

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Label = styled.span`
  font-weight: 600;
  color: var(--primary-color);
`;

const Value = styled.span`
  color: var(--text-color);
`;

const RightBlock = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Input = styled.input`
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  background: #fafbfc;
  color: var(--text-color);
  outline: none;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid var(--primary-color);
  }
`;

const Textarea = styled.textarea`
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  background: #fafbfc;
  color: var(--text-color);
  outline: none;
  resize: vertical;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid var(--primary-color);
  }
`;

const SubmitButton = styled.button`
  background: var(--primary-color);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.9rem 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6em;
  transition: background 0.2s;
  &:hover {
    background: #7e4fd4;
  }
`;

const HoneypotInput = styled.input`
  display: none;
`;

const ErrorMsg = styled.div`
  color: #e74c3c;
  font-size: 0.95rem;
  margin-top: 0.5rem;
`;

const SuccessMsg = styled.div`
  color: #27ae60;
  font-size: 0.95rem;
  margin-top: 0.5rem;
`;

export default ContactUs; 