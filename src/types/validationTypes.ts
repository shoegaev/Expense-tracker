export type ValidationState = {
  isValid: boolean;
  errMessage: string | null;
};

export type StateWithValidation<T> = {
  value: T;
  validation: ValidationState;
};

export type ValidationRequirements<T> = {
  isRequired?: boolean;
  validations?: {message?: string; callbak: (value: T) => boolean}[];
};

export type changeValueOnInputHandler<T> = (
  newValue: T,
  prevValue: T,
  data?: T,
) => T;
