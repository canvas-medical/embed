import { useRef, useEffect } from 'preact/hooks'

export const usePreviousValue = (value: any) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
