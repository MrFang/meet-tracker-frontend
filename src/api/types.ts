export interface Meeting {
    id: number;
    title: string;
    datetime: string;
}

export interface Contact {
    id: number;
    first_name: string;
    second_name?: string;
    telephone?: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export interface RefreshResponse {
    token: string;
}

export type APIResponseWithData<T> = SuccessAPIResponseWithData<T> | ErrorAPIResponse

export type APIResponseWithoutData = SuccessAPIResponseWithoutData | ErrorAPIResponse

export interface SuccessAPIResponseWithData<T> {
    success: true;
    error: null;
    data: T;
}

export interface SuccessAPIResponseWithoutData {
    success: true;
    error: null;
    data: null;
}

interface ErrorAPIResponse {
    success: false;
    error: string;
    data: null;
}
