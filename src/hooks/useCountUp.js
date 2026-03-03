import { useEffect, useState } from 'react'

export function useCountUp(target, duration = 1800, isActive = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    let startTime = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }

    requestAnimationFrame(step)
  }, [isActive, target, duration])

  return count
}
