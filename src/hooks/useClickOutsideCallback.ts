import { RefObject, useEffect } from 'react'

export function useClickOutsideCallback(ref: RefObject<any>, callback: (() => void) | undefined) {
   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (ref?.current && !ref.current.contains(event.target)) {
            callback && callback()
         }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [ref])
}
