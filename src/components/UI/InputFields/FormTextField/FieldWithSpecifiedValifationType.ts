import {ControlParams} from "../../../../types/ControlParamsType";
import {
  StateWithValidation,
  ValidationRequirements,
} from "../../../../types/validationTypes";
import {changeValueOnInputHandler} from "../../../../types/validationTypes";

export type FieldWithSpecifiedValifationProps = {
  controlParams: ControlParams<StateWithValidation<string>>;
  cssClasses?: string[];
  fieldCssClasses?: string[];
  placeholder?: string;
  labelText?: string;
  validationRequirements?: ValidationRequirements<string>;
  changeValueOnInputHandler?: changeValueOnInputHandler<string>;
};
