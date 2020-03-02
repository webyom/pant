import * as preact from 'preact';
import { Checkbox, CheckboxProps } from '../checkbox';

export type RadioProps = {} & CheckboxProps;

export function Radio(props: RadioProps): preact.JSX.Element {
  return <Checkbox {...props} />;
}

Radio.defaultProps = {
  checked: false,
  disabled: false,
  role: 'radio',
};
