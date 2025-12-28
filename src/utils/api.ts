/**
 * API 호출 유틸리티
 * 모든 API 호출은 AbortController를 사용하여 중단 가능하도록 구현
 */

import { useEffect, useRef } from 'react'

export interface ApiRequestOptions extends RequestInit {
  timeout?: number
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`)
    this.name = 'ApiError'
  }
}

/**
 * API 서비스 클래스
 * 모든 요청에 AbortController를 자동으로 적용
 */
export class ApiService {
  private abortController: AbortController | null = null
  private baseURL: string

  constructor(baseURL: string = '') {
    this.baseURL = baseURL
  }

  /**
   * API 요청 실행
   * @param url - 요청 URL
   * @param options - Fetch 옵션
   * @returns Promise<T>
   */
  async request<T>(
    url: string,
    options: ApiRequestOptions = {}
  ): Promise<T> {
    // 이전 요청이 있으면 중단
    this.abort()

    // 새로운 AbortController 생성
    this.abortController = new AbortController()

    const { timeout = 30000, ...fetchOptions } = options

    // 타임아웃 설정
    const timeoutId = setTimeout(() => {
      if (this.abortController) {
        this.abortController.abort()
      }
    }, timeout)

    try {
      const fullUrl = this.baseURL ? `${this.baseURL}${url}` : url

      const response = await fetch(fullUrl, {
        ...fetchOptions,
        signal: this.abortController.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new ApiError(
          response.status,
          response.statusText,
          `Request failed: ${response.status} ${response.statusText}`
        )
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }

      return (await response.text()) as T
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request aborted')
        throw new Error('Request was aborted')
      }

      if (error instanceof ApiError) {
        throw error
      }

      throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      this.abortController = null
    }
  }

  /**
   * GET 요청
   */
  async get<T>(url: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' })
  }

  /**
   * POST 요청
   */
  async post<T>(
    url: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * PUT 요청
   */
  async put<T>(
    url: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * DELETE 요청
   */
  async delete<T>(url: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' })
  }

  /**
   * 현재 진행 중인 요청 중단
   */
  abort(): void {
    if (this.abortController) {
      this.abortController.abort()
      this.abortController = null
    }
  }
}

/**
 * 기본 API 서비스 인스턴스
 */
export const apiService = new ApiService(
  import.meta.env.VITE_API_BASE_URL || ''
)

/**
 * 커스텀 훅: API 호출 시 자동으로 cleanup 처리
 */
export function useApiService() {
  const serviceRef = useRef<ApiService>(new ApiService())

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 모든 요청 중단
      serviceRef.current.abort()
    }
  }, [])

  return serviceRef.current
}

