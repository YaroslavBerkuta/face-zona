import { Exeption } from "src/shared"

export class WrongCodeExeption extends Exeption {
    protected key = 'wrong-code'

    constructor() {
        super('Wrong code')
    }
}