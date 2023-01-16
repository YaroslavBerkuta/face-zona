import { ApiExeption } from "./api.exeption";

export class ApiValidateExeption extends ApiExeption {

    constructor(private data: any) {
        super('validation', 'Data is not valid')
    }
}