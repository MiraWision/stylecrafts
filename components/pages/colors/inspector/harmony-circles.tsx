import React from 'react'
import styled from 'styled-components'
import { convertColor, ColorFormat } from '@mirawision/colorize'

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

  return (
    <Container>
      {HARMONIES.map(({ name, angles }) => (
        <Block key={name}>
          <Title>{name}</Title>
          <WheelWrapper>
            <Gradient rotation={-baseH} />

            <InnerMask />

            <SvgOverlay viewBox="0 0 80 80">
              {angles.length === 2 ? (
                <line
                  x1={point(angles[0]).x}
                  y1={point(angles[0]).y}
                  x2={point(angles[1]).x}
                  y2={point(angles[1]).y}
                  stroke="#333"
                  strokeWidth={1}
                />
              ) : (
                <polygon
                  points={angles.map(a => {
                    const p = point(a)
                    return `${p.x},${p.y}`
                  }).join(' ')}
                  fill="none"
                  stroke="#333"
                  strokeWidth={1}
                />
              )}
              {angles.map((a, i) => {
                const hue = baseH + a
                const colorHex = toHex({ h: hue, s: baseS, l: baseL })
                const p = point(a)
                return (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill={colorHex}
                    stroke="#333"
                    strokeWidth={1}
                  />
                )
              })}
            </SvgOverlay>
          </WheelWrapper>
        </Block>
      ))}
    </Container>
  )

  function point(angleDeg: number) {
    const R = 34
    const C = 40
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
  gap: 20px;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  margin-bottom: 8px;
  font-size: 0.9em;
  color: #444;
`

const WheelWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`

const Gradient = styled.div<{ rotation: number }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    hsl(0,100%,50%),
    hsl(60,100%,50%),
    hsl(120,100%,50%),
    hsl(180,100%,50%),
    hsl(240,100%,50%),
    hsl(300,100%,50%),
    hsl(360,100%,50%)
  );
  transform: rotate(${p => p.rotation}deg);
  transition: transform 0.4s ease;
`

const InnerMask = styled.div`
  position: absolute;
  inset: 6px;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
`

const SvgOverlay = styled.svg`
  position: absolute;
  inset: 0;
  pointer-events: none;
`
