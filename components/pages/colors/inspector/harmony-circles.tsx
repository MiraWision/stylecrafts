import React, { useState } from 'react'
import styled from 'styled-components'
import { convertColor, ColorFormat } from '@mirawision/colorize'
import { CopyIcon } from '@/components/icons/copy'
import { CheckmarkIcon } from '@/components/icons/checkmark'
import { useToast } from '@/components/ui/toast'

const HARMONIES = [
  { name: 'Complementary',       angles: [0, 180] },
  { name: 'Split-Complementary', angles: [0, 150, 210] },
  { name: 'Analogous',           angles: [330, 0, 30] },
  { name: 'Triadic',             angles: [0, 120, 240] },
  { name: 'Tetradic',            angles: [0, 60, 180, 240] },
  { name: 'Square',              angles: [0, 90, 180, 270] },
]

function parseHSL(hex: string) {
  const hsl = convertColor(hex, ColorFormat.HSL)
  const [h, s, l] = hsl.match(/\d+(\.\d+)?/g)!.map(Number)
  return { h, s, l }
}

function toHex({ h, s, l }: { h: number; s: number; l: number }) {
  const hue = ((h % 360) + 360) % 360
  return convertColor(
    `hsl(${Math.round(hue)}, ${Math.round(s)}%, ${Math.round(l)}%)`,
    ColorFormat.HEX
  )
}

interface Props {
  color: string 
}

export const HarmonyCircles: React.FC<Props> = ({ color }) => {
  const { h: baseH, s: baseS, l: baseL } = parseHSL(color)
  const [hoveredCircle, setHoveredCircle] = useState<string | null>(null)
  const [hoveredWheel, setHoveredWheel] = useState<string | null>(null)
  const [centerText, setCenterText] = useState<string | null>(null)
  const [copiedCircle, setCopiedCircle] = useState<string | null>(null)
  const { toast } = useToast()

  return (
    <Container>
      {HARMONIES.map(({ name, angles }) => (
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
                const hue = baseH + a
                const colorHex = toHex({ h: hue, s: baseS, l: baseL })
                const p = point(a)
                const circleId = `${name}-${i}`
                const isHovered = hoveredCircle === circleId
                return (
                  <g key={i}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 11 : 8}
                      fill={colorHex}
                      style={{ 
                        cursor: 'pointer', 
                        transition: 'r 0.3s ease',
                        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                      }}
                      onMouseEnter={() => {
                        setHoveredCircle(circleId)
                        setCenterText(colorHex)
                      }}
                      onMouseLeave={() => {
                        setHoveredCircle(null)
                        setCenterText(null)
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(colorHex)
                        toast.success('Color copied to clipboard', colorHex)
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
  margin-bottom: 6px;
  font-size: 0.8em;
  color: #666;
  font-weight: 500;
`

const WheelWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
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
  inset: 7px;
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
  width: 70px;
  height: 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const CenterTextContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  padding: 2px 4px;

  .icon * {
    fill: var(--primary-color);
  }
`
