import { useEffect, useState } from 'react'

export const useAsylumApi = <T>(action: () => Promise<T>) => {
   const [data, setData] = useState<T>()
   const [error, setError] = useState<Error>()
   const [loading, setLoading] = useState(true)

   const fetch = (): Promise<void> => {
      return action()
         .then(setData)
         .catch(setError)
         .finally(() => setLoading(false))
   }

   useEffect(() => {
      fetch()
   }, [])

   return { data, error, loading, refetch: fetch }
}
