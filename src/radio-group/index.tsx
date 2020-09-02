import * as preact from 'preact';
import { CheckboxGroup, CheckboxGroupBaseProps } from '../checkbox-group';
import { omit, isDef } from '../utils';

export type RadioGroupProps = CheckboxGroupBaseProps & {
  defaultValue?: string;
};

export class RadioGroup extends preact.Component<RadioGroupProps> {
  private readonly ref = preact.createRef();

  getValue(): string[] {
    const res = this.ref.current.getValue();
    return res && res[0];
  }

  render(): preact.JSX.Element {
    const { defaultValue } = this.props;
    const passProps = omit(this.props, ['defaultValue', 'max', 'onMaxLimit']);
    return (
      <CheckboxGroup
        {...passProps}
        ref={this.ref}
        defaultValue={(isDef(defaultValue) && [defaultValue]) || undefined}
        role="radio"
        max="1"
      />
    );
  }
}
