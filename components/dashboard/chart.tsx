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
}

export function Chart({ title, description, data }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

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

    // Use actual color values instead of CSS variables
    const primaryColor = "#A855F7" // Electric violet (our primary color)

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
    ctx.fillStyle = "#0F172A" // Background color (deep indigo)
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
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
    gradient.addColorStop(0, "rgba(168, 85, 247, 0.2)") // Primary color with opacity
    gradient.addColorStop(1, "rgba(168, 85, 247, 0)") // Primary color with zero opacity
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
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="aspect-[2/1] w-full">
          <canvas ref={canvasRef} width={500} height={250} className="w-full h-full"></canvas>
        </div>
      </CardContent>
    </Card>
  )
}

