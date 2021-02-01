import { withoutAuth } from './axios'


export async function register (username: string, password: string): Promise<any> {
    withoutAuth.post(
        '/auth/register',
        {
            username,
            password
        }
    )
}

export async function login (username: string, password: string): Promise<any> {
    withoutAuth.post(
        '/auth/login',
        {
            username,
            password
        }
    ).then(resp => {
        localStorage.setItem('accessToken', resp.data.data.access_token)
        localStorage.setItem('refreshToken', resp.data.data.resresh_token)
    })
}

export async function refresh (): Promise<any> {
    localStorage.removeItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken')
    withoutAuth.get(
        '/auth/refresh',
        {
            headers: { Authorization: `Bearer ${refreshToken}` }
        }
    ).then(resp => {
        localStorage.setItem('accessToken', resp.data.data.token)
    })
}

export async function logout(): Promise<any> {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    withoutAuth.post(
        '/auth/logout',
        {
            // eslint-disable-next-line
            access_token: accessToken,
            // eslint-disable-next-line
            refresh_token: refreshToken
        }
    ).then(resp => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    })
}
