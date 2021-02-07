import { UserCredentials } from '@/common/types'
import { withoutAuth } from './axios'
import { LoginResponse, RefreshResponse, SuccessAPIResponseWithData, SuccessAPIResponseWithoutData } from './types'

export async function register (credentials: UserCredentials): Promise<void> {
    await withoutAuth.post<SuccessAPIResponseWithoutData>(
        '/auth/register',
        {
            username: credentials.username,
            password: credentials.password
        }
    )
}

export async function login (credentials: UserCredentials): Promise<void> {
    const resp = await withoutAuth.post<SuccessAPIResponseWithData<LoginResponse>>(
        '/auth/login',
        {
            username: credentials.username,
            password: credentials.password
        }
    )

    localStorage.setItem('accessToken', resp.data.data.access_token)
    localStorage.setItem('refreshToken', resp.data.data.refresh_token)
}

export async function refresh (): Promise<void> {
    localStorage.removeItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const resp = await withoutAuth.get<SuccessAPIResponseWithData<RefreshResponse>>(
        '/auth/refresh',
        {
            headers: { Authorization: `Bearer ${refreshToken}` }
        }
    )

    localStorage.setItem('accessToken', resp.data.data.token)
}

export async function logout (): Promise<void> {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    await withoutAuth.post<SuccessAPIResponseWithoutData>(
        '/auth/logout',
        {
            // eslint-disable-next-line
            access_token: accessToken,
            // eslint-disable-next-line
            refresh_token: refreshToken
        }
    )

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}
