import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

interface IResult<T> {
  details: T
  reload: () => void
  isLoading: boolean
}

export function useApiObjectDetails<T>(
  req: (id: number) => Promise<AxiosResponse<T>>,
  id: number,
): IResult<T> {
  const [details, setDetails] = useState<T>(null)
  const [isLoading, setLoading] = useState(false)

  const load = async () => {
    try {
      setLoading(true)
      const { data } = await req(id)
      setDetails(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) load()
  }, [id])

  return {
    details,
    isLoading,
    reload: load,
  }
}
