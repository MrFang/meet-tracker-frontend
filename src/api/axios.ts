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
    baseURL: BASE_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

withoutAuth.interceptors.response.use(
    (response: AxiosResponse<APIResponseWithoutData | APIResponseWithData<any>>) => checkAPIResponse(response),
    (error: any) => error
)
withAuth.interceptors.response.use(
    (response: AxiosResponse<APIResponseWithoutData | APIResponseWithData<any>>) => checkAPIResponse(response),
    async (error: any) => {
        if (error.response.status === 401) {
            try {
                await refresh()
            } catch (err) {
                if (err.response.status === 401) {
                    router.push({ params: { name: 'Login' } })
                } else {
                    throw err
                }
            }
            const retryConfig = error.response.config
            retryConfig.headers = { ...retryConfig.headers, Authorization:  `Bearer ${localStorage.getItem('accessToken')}` }

            return withAuth.request(retryConfig)
        } else {
            return Promise.reject(error)
        }
    }
)

export { withAuth, withoutAuth }
