import {
  ValidationRequirements,
  StateWithValidation,
} from "../types/validationTypes";

export function validateValue(
  value: string,
  ValidationRequirements: ValidationRequirements<string>,
): StateWithValidation<string> {
  let isValueValid = true;
  let errMessage: null | string = null;

  if (value.trim() === "") {
    isValueValid = !ValidationRequirements?.isRequired;
  } else {
    for (const v of ValidationRequirements.validations) {
      if (!v.callbak(value)) {
        isValueValid = false;
        errMessage = v.message ?? null;
        break;
      }
    }
  }

  return {
    value: value,
    validation: {isValid: isValueValid, errMessage: errMessage},
  };
}
