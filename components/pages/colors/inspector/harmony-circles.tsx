import React, { useState } from 'react'
import styled from 'styled-components'
import { convertColor, ColorFormat, parseColorNumbers, HSL } from '@mirawision/colorize'

import { useToast } from '@/components/ui/toast'
import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { CopyIcon } from '@/components/icons/copy'
import { CheckmarkIcon } from '@/components/icons/checkmark'
import { copyText } from '@mirawision/copily';

const Harmonies = [
  { name: 'Complementary',       angles: [0, 180] },
  { name: 'Split-Complementary', angles: [0, 150, 210] },
  { name: 'Analogous',           angles: [330, 0, 30] },
  { name: 'Triadic',             angles: [0, 120, 240] },
  { name: 'Tetradic',            angles: [0, 60, 180, 240] },
  { name: 'Square',              angles: [0, 90, 180, 270] },
]

function parseHSL(hex: string) {
  try {
    const hsl = convertColor(hex, ColorFormat.HSL)
    const matches = hsl.match(/\d+(\.\d+)?/g)
    if (!matches || matches.length < 3) {
      throw new Error('Invalid HSL format')
    }
    const [h, s, l] = matches.map(Number)
    return { h, s, l }
  } catch (error) {
    console.warn('Failed to parse color:', hex, error)
    // Return default values for invalid colors
    return { h: 0, s: 50, l: 50 }
  }
}

interface Props {
  color: string 
}

export const HarmonyCircles: React.FC<Props> = ({ color }) => {
  const { h: baseH, s: baseS, l: baseL } = parseColorNumbers(color, ColorFormat.HSL) as HSL;

  const [hoveredCircle, setHoveredCircle] = useState<string | null>(null)
  const [hoveredWheel, setHoveredWheel] = useState<string | null>(null)
  const [centerText, setCenterText] = useState<string | null>(null)
  const [copiedCircle, setCopiedCircle] = useState<string | null>(null)

  const { toast } = useToast()

  return (
    <Container>
      {Harmonies.map(({ name, angles }) => (
        <Block key={name}>
          <Title>{name}</Title>
          <WheelWrapper
            onMouseEnter={() => setHoveredWheel(name)}
            onMouseLeave={() => {
              setHoveredWheel(null)
              setCenterText(null)
            }}
          >
            <Gradient rotation={-baseH} saturation={baseS} lightness={baseL} />

            <InnerMask />

            <SvgOverlay viewBox="0 0 100 100">
              {angles.length === 2 ? (
                <line
                  x1={point(angles[0]).x}
                  y1={point(angles[0]).y}
                  x2={point(angles[1]).x}
                  y2={point(angles[1]).y}
                  stroke="var(--surface-500)"
                  strokeWidth={1}
                />
              ) : (
                <polygon
                  points={angles.map(a => {
                    const p = point(a)
                    return `${p.x},${p.y}`
                  }).join(' ')}
                  fill="none"
                  stroke="var(--surface-500)"
                  strokeWidth={1}
                />
              )}
              {angles.map((a, i) => {
                const hue = (baseH + a) % 360;
                const colorHex = convertColor(`hsl(${hue}, ${baseS}%, ${baseL}%)`, ColorFormat.HEX);
                const p = point(a);
                const circleId = `${name}-${i}`;
                const isHovered = hoveredCircle === circleId;

                return (
                  <g key={i}>
                    <StyledCircle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 11 : 8}
                      fill={colorHex}
                      onMouseEnter={() => {
                        setHoveredCircle(circleId)
                        setCenterText(colorHex)
                      }}
                      onMouseLeave={() => {
                        setHoveredCircle(null)
                        setCenterText(null)
                      }}
                      onClick={() => {
                        copyText(colorHex);
                        GAService.logEvent(analyticsEvents.colors.inspector.harmonyColorCopied(colorHex));
                        toast.success('Copied!', 'Color copied to clipboard')
                        setCopiedCircle(circleId)
                        setTimeout(() => {
                          setCopiedCircle(null)
                        }, 3000)
                      }}
                    />

                  </g>
                )
              })}
            </SvgOverlay>
            
            {hoveredWheel === name && centerText && (
              <CenterTextContainer>
                <CenterTextBackground />
                <CenterTextContent>
                  {centerText}
                  {copiedCircle && hoveredCircle === copiedCircle ? (
                    <CheckmarkIcon width="14" height="14" />
                  ) : (
                    <CopyIcon width="14" height="14" />
                  )}
                </CenterTextContent>
              </CenterTextContainer>
            )}
          </WheelWrapper>
        </Block>
      ))}
    </Container>
  )

  function point(angleDeg: number) {
    const R = 35
    const C = 50
    const rad = ((angleDeg - 0) * Math.PI) / 180
    return {
      x: C + R * Math.sin(rad),
      y: C - R * Math.cos(rad),
    }
  }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 16px;
  margin-top: 1rem;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  margin-bottom: 0.375rem;
  font-size: 0.875rem;
  color: var(--surface-500);
`

const WheelWrapper = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.1));
`

const Gradient = styled.div<{ rotation: number; saturation: number; lightness: number }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    hsl(0,${p => p.saturation}%,${p => p.lightness}%),
    hsl(60,${p => p.saturation}%,${p => p.lightness}%),
    hsl(120,${p => p.saturation}%,${p => p.lightness}%),
    hsl(180,${p => p.saturation}%,${p => p.lightness}%),
    hsl(240,${p => p.saturation}%,${p => p.lightness}%),
    hsl(300,${p => p.saturation}%,${p => p.lightness}%),
    hsl(360,${p => p.saturation}%,${p => p.lightness}%)
  );
  transform: rotate(${p => p.rotation}deg);
  transition: transform 0.4s ease;
`

const InnerMask = styled.div`
  position: absolute;
  inset: 0.4375rem;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
`

const SvgOverlay = styled.svg`
  position: absolute;
  inset: 0;
  pointer-events: auto;
`

const CenterTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
`

const CenterTextBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4.375rem;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  border: 1px solid var(--surface-300);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const CenterTextContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--surface-900);
  white-space: nowrap;
  padding: 0.125rem 0.25rem;

  .icon * {
    fill: var(--primary-color);
  }
`

const StyledCircle = styled.circle`
  cursor: pointer;
  transition: r 0.3s ease;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
`
