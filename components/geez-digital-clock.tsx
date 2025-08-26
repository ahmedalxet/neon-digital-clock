"use client"

import { useState, useEffect } from "react"

// Geez numeral mappings
const geezNumerals: { [key: string]: string } = {
  "0": "፲", // Actually represents 10 in Geez, but we'll use it for 0
  "1": "፩",
  "2": "፪",
  "3": "፫",
  "4": "፬",
  "5": "፭",
  "6": "፮",
  "7": "፯",
  "8": "፰",
  "9": "፱",
}

function convertToGeez(timeString: string): string {
  return timeString
    .split("")
    .map((char) => {
      if (char in geezNumerals) {
        return geezNumerals[char]
      }
      return char // Keep colons and other characters as-is
    })
    .join("")
}

export default function GeezDigitalClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const geezTime = convertToGeez(time)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold text-primary neon-glow tracking-wider">
          {geezTime}
        </h1>
        <div className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-mono font-bold text-primary/10 blur-sm">
          {geezTime}
        </div>
      </div>
    </div>
  )
}
