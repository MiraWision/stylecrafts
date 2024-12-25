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

const ContentSettings: React.FC<Props> = ({ setContent }) => {
  const [dataType, setDataType] = useState<DataType>(DataType.URL);
  const [inputData, setInputData] = useState<Record<string, string | number | boolean>>({});

  useEffect(() => {
    setContent(generateContent(dataType, inputData));
  }, [inputData, setContent]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setInputData({ ...inputData, [field]: value });
  };

  const renderFields = () => {
    switch (dataType) {
      case DataType.Text:
        return (
          <FieldContainer>
            <Label>Text</Label>

            <InputText
              value={inputData.text as string ?? ''}
              onChange={(e) => handleInputChange('text', e.target.value)}
            />
          </FieldContainer>
        );

      case DataType.URL:
        return (
          <FieldContainer>
            <Label>URL</Label>

            <InputText
              value={inputData.url as string ?? ''}
              onChange={(e) => handleInputChange('url', e.target.value)}
            />
          </FieldContainer>
        );

      case DataType.Email:
        return (
          <>
            <FieldContainer>
              <Label>Email Address</Label>

              <InputText
                value={inputData.email as string ?? ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Subject</Label>

              <InputText
                value={inputData.subject as string ?? ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Body</Label>

              <InputTextarea
                value={inputData.body as string ?? ''}
                onChange={(e) => handleInputChange('body', e.target.value)}
              />
            </FieldContainer>
          </>
        );

      case DataType.Phone:
        return (
          <FieldContainer>
            <Label>Phone Number</Label>

            <InputText
              value={inputData.phone as string ?? ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </FieldContainer>
        );
        
      case DataType.SMS:
        return (
          <>
            <FieldContainer>
              <Label>Phone Number</Label>

              <InputText
                value={inputData.smsPhone as string ?? ''}
                onChange={(e) => handleInputChange('smsPhone', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Message</Label>
              <InputTextarea
                value={inputData.smsMessage as string ?? ''}
                onChange={(e) => handleInputChange('smsMessage', e.target.value)}
              />
            </FieldContainer>
          </>
        );
      
      case DataType.WiFi:
        return (
          <>
            <FieldContainer>
              <Label>SSID</Label>

              <InputText
                value={inputData.wifiSsid as string ?? ''}
                onChange={(e) => handleInputChange('wifiSsid', e.target.value)}
              />
            </FieldContainer>

            <FieldsGrid>
              <FieldContainer>
                <Label>Encryption Type</Label>

                <Dropdown
                  value={inputData.wifiEncryption as string ?? 'WPA'}
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
                  checked={inputData.wifiHidden as boolean ?? false}
                  onChange={(e) => handleInputChange('wifiHidden', Boolean(e.checked))}
                />
              </FieldContainer>
            </FieldsGrid>

            {inputData.wifiEncryption !== 'nopass' && (
              <FieldContainer>
                <Label>Password</Label>

                <InputText
                  type='password'
                  value={inputData.wifiPassword as string ?? ''}
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
              <Label>Full Name</Label>

              <InputText
                value={inputData.vcardFullName as string ?? ''}
                onChange={(e) => handleInputChange('vcardFullName', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Organization</Label>

              <InputText
                value={inputData.vcardOrg as string ?? ''}
                onChange={(e) => handleInputChange('vcardOrg', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Title</Label>

              <InputText
                value={inputData.vcardTitle as string ?? ''}
                onChange={(e) => handleInputChange('vcardTitle', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Phone</Label>

              <InputText
                value={inputData.vcardPhone as string ?? ''}
                onChange={(e) => handleInputChange('vcardPhone', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Email</Label>

              <InputText
                type='email'
                value={inputData.vcardEmail as string ?? ''}
                onChange={(e) => handleInputChange('vcardEmail', e.target.value)}
              />
            </FieldContainer>
          </>
        );
      
      case DataType.Event:
        return (
          <>
            <FieldContainer>
              <Label>Event Summary</Label>

              <InputText
                value={inputData.eventSummary as string ?? ''}
                onChange={(e) => handleInputChange('eventSummary', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Start Date & Time</Label>

              <InputText
                type='datetime-local'
                value={inputData.eventStart as string ?? ''}
                onChange={(e) => handleInputChange('eventStart', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>End Date & Time</Label>

              <InputText
                type='datetime-local'
                value={inputData.eventEnd as string ?? ''}
                onChange={(e) => handleInputChange('eventEnd', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Location</Label>

              <InputText
                value={inputData.eventLocation as string ?? ''}
                onChange={(e) => handleInputChange('eventLocation', e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Description</Label>

              <InputTextarea
                value={inputData.eventDescription as string ?? ''}
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
        value={dataType}
        onChange={(value) => setDataType(value as DataType)}
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
