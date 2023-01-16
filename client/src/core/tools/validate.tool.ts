import _ from "lodash";
import moment from "moment";
import _validate from "validate.js";
import { prepareValidatorResult } from "../helpers/validator.helpers";

_validate.extend(_validate.validators.datetime, {
  parse: function (value: any) {
    console.log("parse", value, +moment.utc(value));
    return +moment.utc(value);
  },
  format: function (value: any, options: any) {
    const format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  },
});

const presenceCost = {
  allowEmpty: false,
  message: "^Поле обов’язкове",
};

const validateEmailRule = {
  message: "^Введений не вірний email",
};

export const validateNumberRule = {
  greaterThan: 0,
  message: "^Введено не вірне значення",
};

const validate = <T extends Record<string, any>>(
  values: T,
  constraints: any
) => {
  const result = _validate(values, constraints);
  return prepareValidatorResult<T>(result);
};

_validate.validators.array = (
  arrayItems: any[],
  options: { length: number; message: string; key?: string }
) => {
  if (_.isEmpty(arrayItems)) return presenceCost.message;
  if (arrayItems.length < options.length) return options.message;

  if (options.key) {
    if (!arrayItems[0][options.key]) return options.message;
  }

  return null;
};

_validate.validators.characters = (
  value: string,
  options: {
    message: string;
  }
) => {
  if (String(value).search(/[^a-zA-Zа-яА-я0-9а-яієїйьЇІ"'.)(, -]+/) !== -1) {
    return options.message ? options.message : "^common.validations.characters";
  }

  return null;
};

export { validate, presenceCost, validateEmailRule };
