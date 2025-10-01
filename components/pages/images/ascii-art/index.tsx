import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Label } from '@/components/ui/texts/label';
import { DownloadTextButton } from '@/components/ui/text-buttons/download-text-button';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links/tool-cross-links';
import { Select } from '@/components/ui/inputs/select';
import { CopyIcon } from '@/components/icons/copy';
import { DownloadIcon } from '@/components/icons/download';

// ===== Types =====

interface AsciiSettings {
  font: string;
  text: string;
  filter: string;
}

// ===== Component =====

const AsciiArtMain: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [asciiResult, setAsciiResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [settings, setSettings] = useState<AsciiSettings>({
    font: 'graffiti',
    text: 'Type Something',
    filter: 'none',
  });


  // Mount flag for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Генерируем ASCII art при изменении настроек
  useEffect(() => {
    if (settings.text.trim()) {
      generateTextAsciiArt();
    }
  }, [settings.text, settings.font, settings.filter]);

  const updateSetting = <K extends keyof AsciiSettings>(key: K, value: AsciiSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };


  const generateTextAsciiArt = async () => {
    if (!settings.text.trim()) return;

    try {
      setIsProcessing(true);
      
      // Улучшенные ASCII art шрифты
      const createFont = (style: string) => {
        const chars: { [key: string]: string[] } = {};
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
        
        alphabet.split('').forEach(char => {
          if (char === ' ') {
            chars[char] = Array(7).fill('        ');
            return;
          }
          
          switch (style) {
            case 'graffiti':
              chars[char] = getGraffitiChar(char);
              break;
            case '3d-diagonal':
              chars[char] = get3DChar(char);
              break;
            case 'alpha':
              chars[char] = getAlphaChar(char);
              break;
            case 'acrobatic':
              chars[char] = getAcrobaticChar(char);
              break;
            case 'avatar':
              chars[char] = getAvatarChar(char);
              break;
            default:
              chars[char] = getGraffitiChar(char);
          }
        });
        
        return chars;
      };

      // Граффити стиль
      const getGraffitiChar = (char: string) => {
        const graffiti: { [key: string]: string[] } = {
          'A': [
            '   ██   ',
            '  ████  ',
            ' ██  ██ ',
            ' ██████ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '        '
          ],
          'B': [
            ' █████  ',
            ' ██  ██ ',
            ' █████  ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' █████  ',
            '        '
          ],
          'C': [
            '  ████  ',
            ' ██  ██ ',
            ' ██     ',
            ' ██     ',
            ' ██  ██ ',
            '  ████  ',
            '        '
          ],
          'D': [
            ' █████  ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' █████  ',
            '        '
          ],
          'E': [
            ' ██████ ',
            ' ██     ',
            ' ████   ',
            ' ██     ',
            ' ██     ',
            ' ██████ ',
            '        '
          ],
          'F': [
            ' ██████ ',
            ' ██     ',
            ' ████   ',
            ' ██     ',
            ' ██     ',
            ' ██     ',
            '        '
          ],
          'G': [
            '  ████  ',
            ' ██  ██ ',
            ' ██     ',
            ' ██ ███ ',
            ' ██  ██ ',
            '  ████  ',
            '        '
          ],
          'H': [
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██████ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '        '
          ],
          'I': [
            ' ██████ ',
            '   ██   ',
            '   ██   ',
            '   ██   ',
            '   ██   ',
            ' ██████ ',
            '        '
          ],
          'J': [
            ' ██████ ',
            '   ██   ',
            '   ██   ',
            '   ██   ',
            ' ██ ██  ',
            '  ███   ',
            '        '
          ],
          'K': [
            ' ██  ██ ',
            ' ██ ██  ',
            ' ████   ',
            ' ██ ██  ',
            ' ██  ██ ',
            ' ██  ██ ',
            '        '
          ],
          'L': [
            ' ██     ',
            ' ██     ',
            ' ██     ',
            ' ██     ',
            ' ██     ',
            ' ██████ ',
            '        '
          ],
          'M': [
            ' ██  ██ ',
            ' ██████ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '        '
          ],
          'N': [
            ' ██  ██ ',
            ' ███ ██ ',
            ' ██████ ',
            ' ██ ███ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '        '
          ],
          'O': [
            '  ████  ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '  ████  ',
            '        '
          ],
          'P': [
            ' █████  ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' █████  ',
            ' ██     ',
            ' ██     ',
            '        '
          ],
          'Q': [
            '  ████  ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██ ███ ',
            '  ████  ',
            '        '
          ],
          'R': [
            ' █████  ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' █████  ',
            ' ██ ██  ',
            ' ██  ██ ',
            '        '
          ],
          'S': [
            '  ████  ',
            ' ██  ██ ',
            '  ██    ',
            '    ██  ',
            ' ██  ██ ',
            '  ████  ',
            '        '
          ],
          'T': [
            ' ██████ ',
            '   ██   ',
            '   ██   ',
            '   ██   ',
            '   ██   ',
            '   ██   ',
            '        '
          ],
          'U': [
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '  ████  ',
            '        '
          ],
          'V': [
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '  ████  ',
            '   ██   ',
            '        '
          ],
          'W': [
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██  ██ ',
            ' ██████ ',
            ' ██  ██ ',
            '        '
          ],
          'X': [
            ' ██  ██ ',
            ' ██  ██ ',
            '  ████  ',
            '  ████  ',
            ' ██  ██ ',
            ' ██  ██ ',
            '        '
          ],
          'Y': [
            ' ██  ██ ',
            ' ██  ██ ',
            '  ████  ',
            '   ██   ',
            '   ██   ',
            '   ██   ',
            '        '
          ],
          'Z': [
            ' ██████ ',
            '     ██ ',
            '    ██  ',
            '   ██   ',
            '  ██    ',
            ' ██████ ',
            '        '
          ]
        };
        return graffiti[char] || graffiti['A'];
      };

      // 3D диагональный стиль
      const get3DChar = (char: string) => {
        const diagonal: { [key: string]: string[] } = {
          'A': [
            '   /\\   ',
            '  /  \\  ',
            ' /____\\ ',
            '/      \\',
            '        ',
            '        ',
            '        '
          ],
          'B': [
            '|\\_     ',
            '|  \\_   ',
            '|    \\_ ',
            '|      \\',
            '|_______/',
            '        ',
            '        '
          ],
          'C': [
            '   /\\   ',
            '  /  \\  ',
            ' /    \\ ',
            ' \\    / ',
            '  \\__/  ',
            '        ',
            '        '
          ]
        };
        return diagonal[char] || diagonal['A'];
      };

      // Альфа стиль
      const getAlphaChar = (char: string) => {
        const alpha: { [key: string]: string[] } = {
          'A': [
            '   ██   ',
            '  ████  ',
            ' ██  ██ ',
            ' ██████ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '        '
          ]
        };
        return alpha[char] || alpha['A'];
      };

      // Акробатический стиль
      const getAcrobaticChar = (char: string) => {
        const acrobatic: { [key: string]: string[] } = {
          'A': [
            '   ██   ',
            '  ████  ',
            ' ██  ██ ',
            ' ██████ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '        '
          ]
        };
        return acrobatic[char] || acrobatic['A'];
      };

      // Аватар стиль
      const getAvatarChar = (char: string) => {
        const avatar: { [key: string]: string[] } = {
          'A': [
            '   ██   ',
            '  ████  ',
            ' ██  ██ ',
            ' ██████ ',
            ' ██  ██ ',
            ' ██  ██ ',
            '        '
          ]
        };
        return avatar[char] || avatar['A'];
      };
      // Создаем шрифт
      const currentFont = createFont(settings.font);
      const text = settings.text.toUpperCase();
      const maxHeight = 7; // Фиксированная высота для всех символов
      const lines: string[] = Array(maxHeight).fill('');

      // Генерируем ASCII art
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charPattern = currentFont[char] || currentFont[' '];
        
        for (let row = 0; row < maxHeight; row++) {
          const patternRow = charPattern[row] || '';
          lines[row] += patternRow + ' ';
        }
      }

      let result = lines.join('\n');

      // Применяем фильтры
      result = applyFilter(result, settings.filter);

      setAsciiResult(result);
      setIsProcessing(false);
    } catch (err) {
      console.error('Error generating ASCII art:', err);
      setIsProcessing(false);
    }
  };

  const applyFilter = (text: string, filter: string): string => {
    switch (filter) {
      case 'reverse':
        return text.split('\n').map(line => 
          line.split('').reverse().join('')
        ).join('\n');
      
      case 'mirror':
        return text.split('\n').map(line => 
          line + ' ' + line.split('').reverse().join('')
        ).join('\n');
      
      case 'upside':
        return text.split('\n').reverse().join('\n');
      
      case 'flip-vertically':
        return text.split('\n').map(line => 
          line.split('').map(char => {
            if (char === '/') return '\\';
            if (char === '\\') return '/';
            if (char === '<') return '>';
            if (char === '>') return '<';
            if (char === '(') return ')';
            if (char === ')') return '(';
            if (char === '[') return ']';
            if (char === ']') return '[';
            return char;
          }).join('')
        ).join('\n');
      
      case 'flip-horizontally':
        return text.split('\n').reverse().join('\n');
      
      case 'rainbow-1':
        return addRainbowEffect(text, 1);
      
      case 'rainbow-2':
        return addRainbowEffect(text, 2);
      
      default:
        return text;
    }
  };

  const addRainbowEffect = (text: string, variant: number): string => {
    const colors = variant === 1 
      ? ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[36m', '\x1b[34m', '\x1b[35m'] // Red, Yellow, Green, Cyan, Blue, Magenta
      : ['\x1b[91m', '\x1b[93m', '\x1b[92m', '\x1b[96m', '\x1b[94m', '\x1b[95m']; // Bright versions
    
    const reset = '\x1b[0m';
    
    return text.split('\n').map(line => {
      return line.split('').map((char, index) => {
        if (char.trim() === '') return char;
        const colorIndex = index % colors.length;
        return colors[colorIndex] + char + reset;
      }).join('');
    }).join('\n');
  };


  const handleDownload = () => {
    if (asciiResult) {
      const blob = new Blob([asciiResult], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'ascii-art.txt';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCopy = () => {
    if (asciiResult) {
      navigator.clipboard.writeText(asciiResult);
    }
  };


  const fontOptions = [
    { label: 'Graffiti', value: 'graffiti' },
    { label: '3D Diagonal', value: '3d-diagonal' },
    { label: 'Alpha', value: 'alpha' },
    { label: 'Acrobatic', value: 'acrobatic' },
    { label: 'Avatar', value: 'avatar' },
  ];

  const filterOptions = [
    { label: 'None', value: 'none' },
    { label: 'Reverse', value: 'reverse' },
    { label: 'Mirror', value: 'mirror' },
    { label: 'Upside Down', value: 'upside' },
    { label: 'Flip Vertically', value: 'flip-vertically' },
    { label: 'Flip Horizontally', value: 'flip-horizontally' },
    { label: 'Rainbow 1', value: 'rainbow-1' },
    { label: 'Rainbow 2', value: 'rainbow-2' },
  ];

  if (!mounted) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Form>
        {/* Превью сверху - большое */}
        <AsciiOutputSection>
          {asciiResult ? (
            <AsciiPreviewWrapper>
              <AsciiPreview>{asciiResult}</AsciiPreview>
              <ActionButtons>
                <ActionButton onClick={handleCopy} title="Copy">
                  <CopyIcon />
                </ActionButton>
                <ActionButton onClick={handleDownload} title="Download .txt">
                  <DownloadIcon />
                </ActionButton>
              </ActionButtons>
            </AsciiPreviewWrapper>
          ) : (
            <Placeholder>
              Type something to generate ASCII art
            </Placeholder>
          )}
        </AsciiOutputSection>


        {/* Двухколоночный layout */}
        <TwoColumnLayout>
          {/* Левая колонка - инпут текста */}
          <LeftColumn>
            <ControlGroup>
              <Label>Input text:</Label>
              <TextInput
                value={settings.text}
                onChange={(e) => updateSetting('text', e.target.value)}
                placeholder="Type Something"
              />
            </ControlGroup>
          </LeftColumn>

          {/* Правая колонка - настройки */}
          <RightColumn>
            <ControlGroup>
              <Label>ASCII Art font:</Label>
              <Select
                value={settings.font}
                options={fontOptions}
                onChange={(value) => updateSetting('font', value)}
              />
            </ControlGroup>

            <ControlGroup>
              <Label>Filter:</Label>
              <Select
                value={settings.filter}
                options={filterOptions}
                onChange={(value) => updateSetting('filter', value)}
              />
            </ControlGroup>
          </RightColumn>
        </TwoColumnLayout>
      </Form>

      <ToolCrossLinks toolKey="ascii-art" />
    </Container>
  );
};

// ===== Styles =====

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const AsciiOutputSection = styled.div`
  margin-bottom: 2rem;
  min-height: 20rem;
`;


const TextInput = styled.textarea`
  width: 100%;
  height: calc(100% - 1rem);
  min-height: 7rem;
  padding: 0.75rem;
  border: 1px solid var(--surface-300);
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  background: var(--surface-0);
  color: var(--text-color);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(144, 88, 170, 0.2);
  }

  &::placeholder {
    color: var(--surface-500);
  }
`;

const AsciiPreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--surface-50);
  border: 1px solid var(--surface-200);
  border-radius: 0.75rem;
  padding: 2rem;
`;

const AsciiPreview = styled.pre`
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-size: 0.4rem;
  line-height: 0.6;
  margin: 0;
  color: var(--text-color);
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: center;
  letter-spacing: 0.01em;
  max-width: 100%;
  max-height: 100%;
  transform: scale(1);
  transform-origin: center;
  overflow: hidden;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20rem;
  background: var(--surface-100);
  border: 2px dashed var(--surface-300);
  border-radius: 0.75rem;
  color: var(--surface-500);
  font-size: 1rem;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActionButtons = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: var(--primary-color-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;


export default AsciiArtMain;
