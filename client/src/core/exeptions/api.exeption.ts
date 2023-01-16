import { AxiosError } from "axios"

export class ApiExeption {
    protected _key: string
    protected _message: string 

    constructor(key: string, message: string ) {

        this._key = key 
        this._message = message
    }

    get key() {
        return this._key
    }

    get message() {
        return this._message
    }


    static fromAxiosError(e: AxiosError) {
        const data = e.response.data
        console.log('fromAxiosError', data)
        return new ApiExeption(data.key, data.description)
    }


}