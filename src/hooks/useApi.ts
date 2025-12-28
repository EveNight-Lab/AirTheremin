/**
 * API 호출을 위한 커스텀 훅
 * 컴포넌트 언마운트 시 자동으로 요청 중단
 */

import { useEffect, useRef } from 'react'
import { ApiService } from '../utils/api'

export function useApi() {
  const apiServiceRef = useRef<ApiService>(new ApiService())

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 모든 요청 중단
      apiServiceRef.current.abort()
    }
  }, [])

  return apiServiceRef.current
}

