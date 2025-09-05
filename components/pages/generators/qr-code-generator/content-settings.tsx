import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { ButtonGroup } from '@/components/ui/button-group';
import { Label } from '@/components/ui/texts/label';

import { QRTextIcon } from '@/components/icons/qr-text';
import { QRWebIcon } from '@/components/icons/qr-web';
import { QREmailIcon } from '@/components/icons/qr-email';
import { QRPhoneIcon } from '@/components/icons/qr-phone';
import { QRSMSIcon } from '@/components/icons/qr-sms';
import { QRWiFiIcon } from '@/components/icons/qr-wifi';
import { QRVCardIcon } from '@/components/icons/qr-vcard';
import { QREventIcon } from '@/components/icons/qr-event';
import { DataType } from './types';

interface Props {
  setContent: (content: string) => void;
  missingFields?: string[];
  inputData?: Record<string, string | number | boolean>;
  dataType?: any;
}

const DataTypeOptions = [
  { icon: QRTextIcon, label: 'Text', value: DataType.Text },
  { icon: QRWebIcon, label: 'URL', value: DataType.URL },
  { icon: QREmailIcon, label: 'Email', value: DataType.Email },
  { icon: QRPhoneIcon, label: 'Phone', value: DataType.Phone },
  { icon: QRSMSIcon, label: 'SMS', value: DataType.SMS },
  { icon: QRWiFiIcon, label: 'WiFi', value: DataType.WiFi },
  { icon: QRVCardIcon, label: 'vCard', value: DataType.VCard },
  { icon: QREventIcon, label: 'Event', value: DataType.Event },
];

const generateContent = (dataType: DataType, data: Record<string, string | number | boolean>): string => {
  if (!data || Object.keys(data).length === 0) {
    return '';
  }

  switch (dataType) {
    case DataType.Text:
      return `${data.text}`;

    case DataType.URL:
      return data.url.toString().startsWith('https') ? data.url.toString() : `https://${data.url}`;

    case DataType.Email:
      const { email, subject, body } = data;

      if (!email) {
        return '';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email as string)) {
        return '';
      }

      let emailContent = `mailto:${email}`;

      if (subject) {
        emailContent += `?subject=${encodeURIComponent(subject)}`;
      }

      if (body) {
        emailContent += `${subject ? '&' : '?'}body=${encodeURIComponent(body)}`;
      }

      return emailContent;

    case DataType.Phone:
      return `tel:${data.phone ?? ''}`;

    case DataType.SMS:
      const { smsPhone, smsMessage } = data;

      if (!smsPhone) {
        return '';
      }

      let smsContent = `sms:${smsPhone}`;

      if (smsMessage) {
        smsContent += `?body=${encodeURIComponent(smsMessage)}`;
      }

      return smsContent;

    case DataType.WiFi:
      const { wifiSsid, wifiEncryption, wifiPassword, wifiHidden } = data;

      if (!wifiSsid) {
        return '';
      }

      let wifiContent = `WIFI:S:${wifiSsid};T:${wifiEncryption || 'WPA'};`;

      if (wifiEncryption !== 'nopass') {
        wifiContent += `P:${wifiPassword || ''};`;
      }

      wifiContent += `H:${wifiHidden ? 'true' : 'false'};;`;
      
      return wifiContent;

    case DataType.VCard:
      const { vcardFullName, vcardOrg, vcardTitle, vcardPhone, vcardEmail } = data;

      if (!vcardFullName) {
        return '';
      }

      let vcardContent = `BEGIN:VCARD
VERSION:3.0
N:${vcardFullName};
FN:${vcardFullName}
`;

      if (vcardOrg) vcardContent += `ORG:${vcardOrg}\n`;
      
      if (vcardTitle) vcardContent += `TITLE:${vcardTitle}\n`;
      
      if (vcardPhone) vcardContent += `TEL;TYPE=WORK,VOICE:${vcardPhone}\n`;
      
      if (vcardEmail) vcardContent += `EMAIL:${vcardEmail}\n`;
      
      vcardContent += `END:VCARD`;

      return vcardContent;

    case DataType.Event:
      const { eventSummary, eventStart, eventEnd, eventLocation, eventDescription } = data;

      if (!eventSummary || !eventStart || !eventEnd) {
        return '';
      }

      const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const pad = (num: number) => String(num).padStart(2, '0');

        return (
          date.getUTCFullYear() +
          pad(date.getUTCMonth() + 1) +
          pad(date.getUTCDate()) +
          'T' +
          pad(date.getUTCHours()) +
          pad(date.getUTCMinutes()) +
          pad(date.getUTCSeconds()) +
          'Z'
        );
      };

      let eventContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventSummary}
DTSTART:${formatDate(eventStart as string)}
DTEND:${formatDate(eventEnd as string)}
`;
      if (eventLocation) eventContent += `LOCATION:${eventLocation}\n`;

      if (eventDescription) eventContent += `DESCRIPTION:${eventDescription}\n`;

      eventContent += `END:VEVENT
END:VCALENDAR`;

      return eventContent;
    
    default:
      return '';
  }
};

const RequiredStar = styled.span`
  color: var(--red-500);
  margin-left: 0.25em;
  cursor: help;
  font-size: 1em;
  position: relative;
  &:hover::after {
    content: 'Required field';
    position: absolute;
    left: 1.2em;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: 0.5em;
    padding: 0.18em 0.7em;
    font-size: 0.93em;
    white-space: nowrap;
    z-index: 10;
    box-shadow: 0 2px 12px 0 rgba(80,40,120,0.08);
    opacity: 1;
    transition: opacity 0.2s, box-shadow 0.2s;
    pointer-events: none;
  }
  &::after {
    opacity: 0;
  }
  &:hover::after {
    opacity: 1;
  }
`;



const InputTextStyled = styled(InputText)<{ $error?: boolean }>`
  border-radius: 0.25rem;
  border: 1.5px solid ${({ $error }) => $error ? 'var(--red-500)' : 'var(--surface-border)'};
  box-shadow: none;
  outline: none;
  transition: border 0.2s;
`;

const InputTextareaStyled = styled(InputTextarea)<{ $error?: boolean }>`
  border-radius: 0.25rem;
  border: 1.5px solid ${({ $error }) => $error ? 'var(--red-500)' : 'var(--surface-border)'};
  box-shadow: none;
  outline: none;
  transition: border 0.2s;
`;

const ContentSettings: React.FC<Props> = ({ setContent, missingFields = [], inputData, dataType }) => {
  const [dataTypeState, setDataTypeState] = useState<DataType>(DataType.URL);
  const [inputDataState, setInputDataState] = useState<Record<string, string | number | boolean>>({});

  useEffect(() => {
    if (typeof dataType !== 'undefined' && dataType !== null) {
      setDataTypeState(dataType);
    }
  }, [dataType]);

  useEffect(() => {
    if (inputData) {
      setInputDataState(inputData);
    }
  }, [inputData]);

  useEffect(() => {
    setContent(generateContent(dataTypeState, inputDataState));
  }, [inputDataState, setContent]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setInputDataState({ ...inputDataState, [field]: value });
  };

  const renderFields = () => {
    switch (dataTypeState) {
      case DataType.Text:
        return (
          <FieldContainer>
            <Label>Text<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

            <InputTextStyled
              value={inputDataState.text as string ?? ''}
              onChange={(e) => handleInputChange('text', e.target.value)}
            />
          </FieldContainer>
        );

      case DataType.URL:
        return (
          <FieldContainer>
            <Label>URL<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

            <InputTextStyled
              value={inputDataState.url as string ?? ''}
              onChange={(e) => handleInputChange('url', e.target.value)}
            />
          </FieldContainer>
        );

      case DataType.Email:
        return (
          <>
            <FieldContainer>
              <Label>Email Address<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

              <InputTextStyled
                value={inputDataState.email as string ?? ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Subject</Label>

              <InputText
                value={inputDataState.subject as string ?? ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Body</Label>

              <InputTextareaStyled
                value={inputDataState.body as string ?? ''}
                onChange={(e) => handleInputChange('body', e.target.value)}
              />
            </FieldContainer>
          </>
        );

      case DataType.Phone:
        return (
          <FieldContainer>
            <Label>Phone Number<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

            <InputTextStyled
              value={inputDataState.phone as string ?? ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </FieldContainer>
        );
        
      case DataType.SMS:
        return (
          <>
            <FieldContainer>
              <Label>Phone Number<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

              <InputTextStyled
                value={inputDataState.smsPhone as string ?? ''}
                onChange={(e) => handleInputChange('smsPhone', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Message</Label>
              <InputTextareaStyled
                value={inputDataState.smsMessage as string ?? ''}
                onChange={(e) => handleInputChange('smsMessage', e.target.value)}
              />
            </FieldContainer>
          </>
        );
      
      case DataType.WiFi:
        return (
          <>
            <FieldContainer>
              <Label>SSID<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

              <InputTextStyled
                value={inputDataState.wifiSsid as string ?? ''}
                onChange={(e) => handleInputChange('wifiSsid', e.target.value)}
              />
            </FieldContainer>

            <FieldsGrid>
              <FieldContainer>
                <Label>Encryption Type</Label>

                <Dropdown
                  value={inputDataState.wifiEncryption as string ?? 'WPA'}
                  options={[
                    { label: 'WPA/WPA2', value: 'WPA' },
                    { label: 'WEP', value: 'WEP' },
                    { label: 'No Password', value: 'nopass' },
                  ]}
                  onChange={(e) => handleInputChange('wifiEncryption', e.value)}
                />
              </FieldContainer>

              <FieldContainer>
                <Label>Hidden</Label>

                <Checkbox
                  checked={inputDataState.wifiHidden as boolean ?? false}
                  onChange={(e) => handleInputChange('wifiHidden', Boolean(e.checked))}
                />
              </FieldContainer>
            </FieldsGrid>

            {inputDataState.wifiEncryption !== 'nopass' && (
              <FieldContainer>
                <Label>Password</Label>

                <InputText
                  type='password'
                  value={inputDataState.wifiPassword as string ?? ''}
                  onChange={(e) => handleInputChange('wifiPassword', e.target.value)}
                />
              </FieldContainer>
            )}
          </>
        );

      case DataType.VCard:
        return (
          <>
            <FieldContainer>
              <Label>Full Name<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

              <InputTextStyled
                value={inputDataState.vcardFullName as string ?? ''}
                onChange={(e) => handleInputChange('vcardFullName', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Organization</Label>

              <InputText
                value={inputDataState.vcardOrg as string ?? ''}
                onChange={(e) => handleInputChange('vcardOrg', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Title</Label>

              <InputText
                value={inputDataState.vcardTitle as string ?? ''}
                onChange={(e) => handleInputChange('vcardTitle', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Phone</Label>

              <InputText
                value={inputDataState.vcardPhone as string ?? ''}
                onChange={(e) => handleInputChange('vcardPhone', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Email</Label>

              <InputText
                type='email'
                value={inputDataState.vcardEmail as string ?? ''}
                onChange={(e) => handleInputChange('vcardEmail', e.target.value)}
              />
            </FieldContainer>
          </>
        );
      
      case DataType.Event:
        return (
          <>
            <FieldContainer>
              <Label>Event Summary<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

              <InputTextStyled
                value={inputDataState.eventSummary as string ?? ''}
                onChange={(e) => handleInputChange('eventSummary', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Start Date & Time<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

              <InputText
                type='datetime-local'
                value={inputDataState.eventStart as string ?? ''}
                onChange={(e) => handleInputChange('eventStart', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>End Date & Time<RequiredStar title="Обязательное поле">*</RequiredStar></Label>

              <InputText
                type='datetime-local'
                value={inputDataState.eventEnd as string ?? ''}
                onChange={(e) => handleInputChange('eventEnd', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Location</Label>

              <InputText
                value={inputDataState.eventLocation as string ?? ''}
                onChange={(e) => handleInputChange('eventLocation', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Description</Label>

              <InputTextareaStyled
                value={inputDataState.eventDescription as string ?? ''}
                onChange={(e) => handleInputChange('eventDescription', e.target.value)}
              />
            </FieldContainer>
          </>
        );
      
      default:
        return null;
    }
  }

  return (
    <Container>
      <ButtonGroup
        options={DataTypeOptions}
        value={dataTypeState}
        onChange={(value) => setDataTypeState(value as DataType)}
      />

      {renderFields()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const FieldContainer = styled.div`
  margin-bottom: 0.5rem;

  input:not(.p-checkbox-input) {
    width: 100%;
    height: 2rem;
    border-radius: 0.5rem;
  }

  textarea {
    width: 100%;
    height: 5rem;
    border-radius: 0.5rem;
  }

  span.p-dropdown-label {
    width: 10rem;
    height: 2rem;
    padding: 0.35rem 0.75rem;
  }

  .p-checkbox {
    margin-top: 0.375rem;
  }
`;

export { ContentSettings };
