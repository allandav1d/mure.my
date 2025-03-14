"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartProps {
  title: string
  description?: string
  data: {
    labels: string[]
    values: number[]
  }
  color?: string
}

export function ChartAdvanced({ title, description, data, color = "primary" }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Get computed colors from CSS
    const computedStyle = getComputedStyle(document.documentElement)
    const primaryColor =
      color === "primary"
        ? getColorFromCSSVar("--primary", computedStyle)
        : getColorFromCSSVar("--secondary", computedStyle)
    const backgroundColor = getColorFromCSSVar("--background", computedStyle)

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find max value for scaling
    const maxValue = Math.max(...data.values) * 1.1

    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1

    // Horizontal grid lines
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      // Draw y-axis labels
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      const value = Math.round(maxValue - (maxValue / gridLines) * i)
      ctx.fillText(value.toString(), padding - 10, y + 3)
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    const barWidth = chartWidth / data.labels.length
    for (let i = 0; i < data.labels.length; i++) {
      const x = padding + barWidth * i + barWidth / 2
      ctx.fillText(data.labels[i], x, height - padding + 15)
    }

    // Draw data line
    ctx.strokeStyle = primaryColor
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i < data.values.length; i++) {
      const x = padding + (chartWidth / (data.values.length - 1)) * i
      const y = padding + chartHeight - (data.values[i] / maxValue) * chartHeight
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = backgroundColor
    for (let i = 0; i < data.values.length; i++) {
      const x = padding + (chartWidth / (data.values.length - 1)) * i
      const y = padding + chartHeight - (data.values[i] / maxValue) * chartHeight
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw gradient area under the line
    const rgbColor = hexToRgb(primaryColor)
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
    gradient.addColorStop(0, `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`)
    gradient.addColorStop(1, `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)`)
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    for (let i = 0; i < data.values.length; i++) {
      const x = padding + (chartWidth / (data.values.length - 1)) * i
      const y = padding + chartHeight - (data.values[i] / maxValue) * chartHeight
      ctx.lineTo(x, y)
    }
    ctx.lineTo(width - padding, height - padding)
    ctx.closePath()
    ctx.fill()
  }, [data, color])

  // Helper function to get color from CSS variable
  function getColorFromCSSVar(varName: string, computedStyle: CSSStyleDeclaration): string {
    const cssVar = computedStyle.getPropertyValue(varName).trim()

    // If it's an HSL value (like "262 83% 65%")
    if (cssVar.includes("%")) {
      const [h, s, l] = cssVar.split(" ")
      return hslToHex(Number.parseInt(h), Number.parseInt(s), Number.parseInt(l))
    }

    // If it's already a hex value
    if (cssVar.startsWith("#")) {
      return cssVar
    }

    // Default fallback colors
    return varName === "--primary" ? "#A855F7" : "#0F172A"
  }

  // Helper function to convert HSL to Hex
  function hslToHex(h: number, s: number, l: number): string {
    s /= 100
    l /= 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    let r = 0,
      g = 0,
      b = 0

    if (0 <= h && h < 60) {
      r = c
      g = x
      b = 0
    } else if (60 <= h && h < 120) {
      r = x
      g = c
      b = 0
    } else if (120 <= h && h < 180) {
      r = 0
      g = c
      b = x
    } else if (180 <= h && h < 240) {
      r = 0
      g = x
      b = c
    } else if (240 <= h && h < 300) {
      r = x
      g = 0
      b = c
    } else if (300 <= h && h < 360) {
      r = c
      g = 0
      b = x
    }

    const rHex = Math.round((r + m) * 255)
      .toString(16)
      .padStart(2, "0")
    const gHex = Math.round((g + m) * 255)
      .toString(16)
      .padStart(2, "0")
    const bHex = Math.round((b + m) * 255)
      .toString(16)
      .padStart(2, "0")

    return `#${rHex}${gHex}${bHex}`
  }

  // Helper function to convert Hex to RGB
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="aspect-[2/1] w-full">
          <canvas ref={canvasRef} width={500} height={250} className="w-full h-full"></canvas>
        </div>
      </CardContent>
    </Card>
  )
}

