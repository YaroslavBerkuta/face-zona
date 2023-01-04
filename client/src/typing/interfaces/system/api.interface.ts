import { AxiosResponse } from "axios";

export type IApiRes<T> = Promise<AxiosResponse<T>>

export interface IApiError {
    status: number 
    data: any
}