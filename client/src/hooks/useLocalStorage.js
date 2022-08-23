import { useEffect, useState } from 'react'

const PERFIXE = 'chat-room-'

/**
 * 把物件加入localStorage 的 hook
 * @param {string} key localStorage 的 key 因為是 chat app 所以加上前綴
 * @param {any} initialValue value 最終要是一個值，所以如果是 function 就執行他
 * @returns key and value
 */
export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PERFIXE + key
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue === undefined) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
