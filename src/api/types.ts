export interface Meeting {
    id: number,
    title: string,
    datetime: string
}

// Sometimes eslint shows error because of snake_case, sometimes not
// If it happens, try to disable linting in this file
export interface Contact {
    id: number,
    first_name: string,
    second_name?: string,
    telephone?: string,
}

export type APIResponseWithData<T> = SuccessAPIResponseWithData<T> | ErrorAPIResponse

export type APIResponseWithoutData  = SuccessAPIResponseWithoutData | ErrorAPIResponse

interface SuccessAPIResponseWithData<T> {
    success: true,
    error: null,
    data: T
}

interface SuccessAPIResponseWithoutData {
    success: true,
    error: null,
    data: null
}

interface ErrorAPIResponse {
    success: false,
    error: string,
    data: null
}
