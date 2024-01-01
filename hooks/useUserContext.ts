import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { useCallback, useEffect } from 'react'

import { httpLocalClient } from '@/clients/httpLocalClient'
import { userContext } from '@/context'
import { Me } from '@/types'

export const useUserContext = () => {
  const router = useRouter()
  const { setUser } = userContext()

  const getUser = useCallback(async () => {
    try {
      const response = await httpLocalClient.get<Me>('/user/me')

      setUser(response.data)
    } catch (error) {
      const response = (error as AxiosError).response

      if (response?.status === 401) {
        if (response.statusText === 'Unauthorized') {
          router.replace('/')
        } else if (response.statusText === 'Token Expired') {
          router.replace('/api/auth/refresh')
        }
      }
    }
  }, [router, setUser])

  useEffect(() => {
    getUser()
  }, [getUser])
}
