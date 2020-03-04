import * as preact from 'preact';
import { Checkbox, CheckboxBaseProps, CheckboxProps, CheckboxRole } from '../checkbox';
import { omit, isDef } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type CheckboxGroupOption =
  | string
  | {
      label: string;
      value: string;
      disabled?: boolean;
    };

export type CheckboxGroupOptions = CheckboxGroupOption[];

export type CheckboxGroupBaseProps = CheckboxBaseProps & {
  options?: CheckboxGroupOptions;
  onClick?(event: Event, checkboxProps: CheckboxProps): void;
  onChange?(value: string[], props: CheckboxGroupProps): void;
};

export type CheckboxGroupProps = CheckboxGroupBaseProps & {
  role?: CheckboxRole;
  defaultValue?: string[];
  max?: number | string;
  onMaxLimit?(props: CheckboxGroupProps): void;
};

type CheckboxGroupState = {
  value: string[];
};

const bem = createBEM('pant-checkbox-group');

export class CheckboxGroup extends preact.Component<CheckboxGroupProps, CheckboxGroupState> {
  state = {
    value: this.props.defaultValue,
  };

  get value(): string[] {
    return this.state.value;
  }

  toggleAll(on?: boolean): void {
    let newValue: string[] = [];
    if (on) {
      newValue = this.props.options.map((option): string => {
        return this.normalizeOption(option).value;
      });
    }
    this.setNewValue(newValue);
  }

  private setNewValue(value: string[]): void {
    const props = this.props;
    const { onChange } = props;
    this.setState({ value }, function(): void {
      onChange && onChange(value, props);
    });
  }

  private normalizeOption(option: CheckboxGroupOption): Exclude<CheckboxGroupOption, string> {
    if (typeof option === 'string') {
      return { label: option, value: option };
    }
    return option;
  }

  private onClick(event: Event, checkboxProps: CheckboxProps): void {
    const props = this.props;
    const { max, onMaxLimit, onClick } = props;
    const oldValue = this.state.value;
    let newValue: string[];

    if (checkboxProps.checked) {
      newValue = oldValue.filter(function(value): boolean {
        return value !== checkboxProps.value;
      });
    } else {
      if (max > 0 && +max === oldValue.length) {
        if (max > 1) {
          onMaxLimit && onMaxLimit(props);
          onClick && onClick(event, checkboxProps);
          return;
        }
        newValue = [checkboxProps.value];
      } else {
        newValue = [checkboxProps.value].concat(oldValue);
      }
    }

    this.setNewValue(newValue);
    onClick && onClick(event, checkboxProps);
  }

  private genOptions(): preact.JSX.Element[] {
    const props = this.props;
    const { options } = props;
    const stateValue = this.state.value;

    return options.map(
      (option): preact.JSX.Element => {
        const passProps = omit(props, ['name', 'options', 'defaultValue', 'max', 'onClick', 'onChange', 'onMaxLimit']);
        option = this.normalizeOption(option);
        return (
          <Checkbox
            {...passProps}
            value={option.value}
            iconNode={props.iconNode}
            activeIconNode={props.activeIconNode}
            inactiveIconNode={props.inactiveIconNode}
            disabled={isDef(option.disabled) ? option.disabled : props.disabled}
            checked={stateValue.includes(option.value)}
            onClick={this.onClick.bind(this)}
          >
            {option.label}
          </Checkbox>
        );
      },
    );
  }

  render(): preact.JSX.Element {
    return <div class={bem([this.props.direction])}>{this.genOptions()}</div>;
  }
}

CheckboxGroup.defaultProps = {
  disabled: false,
  labelPosition: 'right',
  shape: 'round',
  direction: 'vertical',
  options: [],
  defaultValue: [],
};
