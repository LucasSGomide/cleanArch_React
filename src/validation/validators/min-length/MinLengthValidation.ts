import { InvalidFieldLengthError } from '@/validation/errors'
import { IFieldValidation } from '@/validation/protocols/FieldValidation'

export class MinLengthValidation implements IFieldValidation {
    constructor(readonly field: string, readonly minLength: number) {}

    validate(value: string): Error {
        return new InvalidFieldLengthError(this.field, this.minLength)
    }
}
