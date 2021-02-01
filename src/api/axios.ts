import axios, { AxiosResponse } from 'axios'
import { APIResponseWithData, APIResponseWithoutData } from './types'
import { BASE_API_URL } from '.'
import { refresh } from './auth'
import router from '@/router'

function checkAPIResponse (resp: AxiosResponse<APIResponseWithData<any> | APIResponseWithoutData>) {
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

withoutAuth.interceptors.response.use(
    (response: AxiosResponse<APIResponseWithoutData | APIResponseWithData<any>>) => checkAPIResponse(response),
    (error: any) => Promise.reject(error)
)

withAuth.interceptors.response.use(
    (response: AxiosResponse<APIResponseWithoutData | APIResponseWithData<any>>) => checkAPIResponse(response),
    async (error: any) => {
        if (error.response.status === 401) {
            try {
                await refresh()
            } catch (err) {
                if (err.response.status === 401) {
                    router.push({ name: 'Login' })
                    return Promise.reject(err)
                } else {
                    throw err
                }
            }
            const retryConfig = error.response.config
            retryConfig.headers = { ...retryConfig.headers, Authorization: `Bearer ${localStorage.getItem('accessToken')}` }

            return withAuth.request(retryConfig)
        } else {
            return Promise.reject(error)
        }
    }
)

export { withAuth, withoutAuth }
