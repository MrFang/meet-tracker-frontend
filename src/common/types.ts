// TODO: Type for datetime string

export interface PostMeetingData {
    title: string
    datetime: string // String format must be YYYY-MM-DDTHH:MM
}

export interface Meeting {
    id: number,
    title: string,
    datetime: string // String format must be YYYY-MM-DDTHH:MM
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