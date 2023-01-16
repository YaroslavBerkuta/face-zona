import { presenceCost, validateEmailRule } from '../tools'

export const baseInfoValidations = {
  contactEmail: { presence: presenceCost, email: validateEmailRule },
  contactPhoneNumber: { presence: presenceCost },
  contactName: {
    presence: presenceCost,
    length: {
      minimum: 2,
      maximum: 30,
      tooShort: '^common.validations.minLength',
      tooLong: '^common.validations.maxLength',
    },
  },
  contactType: { presence: presenceCost },

  city: { presence: presenceCost },
  country: { presence: presenceCost },
  lat: { presence: presenceCost },
  lng: { presence: presenceCost },

  translates: {
    presence: {
      allowEmpty: false,
      message: '^common.validations.translatesRequired',
    },
    length: {
      minimum: 1,
      tooShort: '^common.validations.translatesRequired',
    },
  },
}
