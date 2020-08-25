import * as preact from 'preact';
import { CheckboxGroup, CheckboxGroupBaseProps } from '../checkbox-group';
import { omit, isDef } from '../utils';

export type RadioGroupProps = CheckboxGroupBaseProps & {
  defaultValue?: string;
};

export const RadioGroup: preact.FunctionalComponent<RadioGroupProps> = props => {
  const { defaultValue } = props;
  const passProps = omit(props, ['defaultValue', 'max', 'onMaxLimit']);
  return (
    <CheckboxGroup
      {...passProps}
      defaultValue={(isDef(defaultValue) && [defaultValue]) || undefined}
      role="radio"
      max="1"
    />
  );
};
