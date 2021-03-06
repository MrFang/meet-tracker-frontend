import axios, { AxiosError, AxiosResponse } from 'axios'
import { APIResponseWithData, APIResponseWithoutData } from './types'
import { BASE_API_URL } from '.'
import { refresh } from './auth'
import router from '@/router'

function checkAPIResponse (resp: AxiosResponse<APIResponseWithData<unknown> | APIResponseWithoutData>) {
    if (!resp.data.success) {
        return Promise.reject(resp.data.error)
    }

    return resp
}

const withoutAuth = axios.create({
    baseURL: BASE_API_URL
})
const withAuth = axios.create({
    baseURL: BASE_API_URL
})

withAuth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` }

        return config
    },
    (err) => Promise.reject(err)
)

withAuth.interceptors.response.use(
    (response: AxiosResponse<APIResponseWithoutData | APIResponseWithData<unknown>>) => checkAPIResponse(response),
    async (authError: AxiosError) => {
        if (authError.response && authError.response.status === 401) {
            try {
                await refresh()
            } catch (refreshError) {
                if (refreshError.response.status === 401) {
                    router.push({ name: 'Login' })
                    throw refreshError
                } else {
                    throw refreshError
                }
            }
            const retryConfig = authError.response.config
            retryConfig.headers = { ...retryConfig.headers, Authorization: `Bearer ${localStorage.getItem('accessToken')}` }

            return withAuth.request(retryConfig)
        } else {
            return Promise.reject(authError)
        }
    }
)

withoutAuth.interceptors.response.use(
    (response: AxiosResponse<APIResponseWithoutData | APIResponseWithData<unknown>>) => checkAPIResponse(response),
    (error: AxiosError) => Promise.reject(error)
)

export { withAuth, withoutAuth }
