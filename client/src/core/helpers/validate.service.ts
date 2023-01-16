import _ from "lodash";
import Validator, { ValidationErrors } from "validatorjs";

// Validator.useLang('en')

Validator.register("required_optional", (value: any) => {
  if (value === undefined) {
    return true;
  } else if (!value || (Array.isArray(value) && !value.length)) {
    return false;
  } else {
    return true;
  }
});

Validator.register("birthday", (value: string) => {
  return new Date(value).getTime() > new Date().getTime();
});

interface Errors {
  [key: string]: string;
}

export const validate = <T>(
  data: T,
  rules: Validator.Rules,
  messages: Record<string, string> = {}
): null | Errors => {
  const validation = new Validator(data, rules, {
    required: "common.validations.required",
    required_optional: "common.validations.required",
    ...messages,
  });

  if (validation.fails()) {
    const errors = validation.errors.all();
    return Object.keys(errors).reduce(
      (values: { [key: string]: string }, key: string) => {
        values[key] = errors[key][0];
        return values;
      },
      {}
    );
  }
  return null;
};

export const transformTranslatesErrors = (errors: Errors) => {
  const translatesErrors: Record<string, string> = {};

  Object.keys(errors).map((key) => {
    if (!key) return null;
    const items = key.split(".");
    translatesErrors[`${items[1] as any}.${items[2]}`] = errors[key];
  });

  return translatesErrors;
};
