import * as preact from 'preact';
import { CheckboxGroup, CheckboxGroupBaseProps } from '../checkbox-group';
import { omit, isDef } from '../utils';

export type RadioGroupProps = CheckboxGroupBaseProps & {
  defaultValue?: string;
};

export function RadioGroup(props: RadioGroupProps): preact.JSX.Element {
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
}
