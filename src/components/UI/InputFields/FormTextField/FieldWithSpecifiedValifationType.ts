import {ControlParams} from "../../../../types/ControlParamsType";
import {
  StateWithValidation,
  ValidationRequirements,
} from "../../../../types/validationTypes";

export interface FieldWithSpecifiedValifationProps {
  controlParams: ControlParams<StateWithValidation<string>>;
  cssClasses?: string[];
  fieldCssClasses?: string[];
  placeholder?: string;
  labelText?: string;
  validationRequirements?: ValidationRequirements<string>;
}
