import { useEffect, useState } from 'react'

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Re-renders on the minute boundary so the clock never lags the system time.
export default function useClock() {
  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    let timer
    function schedule() {
      const now = new Date()
      const untilNextMinute = 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds())
      timer = setTimeout(() => {
        setTime(formatTime())
        schedule()
      }, untilNextMinute)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [])

  return time
}
