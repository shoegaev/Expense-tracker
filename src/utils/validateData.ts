import {
  ValidationRequirements,
  StateWithValidation,
} from "../types/validationTypes";

export function validateValue(
  value: string,
  validationRequirements: ValidationRequirements<string>,
): StateWithValidation<string> {
  let isValueValid = true;
  let errMessage: null | string = null;

  if (value.trim() === "") {
    isValueValid = !validationRequirements?.isRequired;
  } else if (validationRequirements.validations) {
    for (const v of validationRequirements.validations) {
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
