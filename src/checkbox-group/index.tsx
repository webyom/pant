import * as preact from 'preact';
import { Checkbox, CheckboxProps } from '../checkbox';
import { omit } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type CheckboxGroupOption =
  | string
  | {
      label: string;
      value: string;
      disabled?: boolean;
      iconNode?: preact.VNode;
    };

export type CheckboxGroupOptions = CheckboxGroupOption[];

export type CheckboxGroupProps = {
  name?: string;
  disabled?: boolean;
  iconSize?: number | string;
  checkedColor?: string;
  labelPosition?: 'left' | 'right';
  labelDisabled?: boolean;
  shape?: 'square' | 'round';
  direction?: 'horizontal' | 'vertical';
  iconNode?: preact.VNode;
  options?: CheckboxGroupOptions;
  defaultValue?: string[];
  max?: number | string;
  onChange?(value: string[], props: CheckboxGroupProps): void;
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

  private onClick(_: Event, checkboxProps: CheckboxProps): void {
    const props = this.props;
    const { max, onChange, onMaxLimit } = props;
    const oldValue = this.state.value;
    let newValue: string[];

    if (checkboxProps.checked) {
      newValue = oldValue.filter(function(value): boolean {
        return value !== checkboxProps.value;
      });
    } else {
      if (max > 0 && +max === oldValue.length) {
        onMaxLimit && onMaxLimit(props);
        return;
      }
      newValue = [checkboxProps.value].concat(oldValue);
    }

    this.setNewValue(newValue);
  }

  private genOptions(): preact.JSX.Element[] {
    const props = this.props;
    const { options } = props;
    const stateValue = this.state.value;

    return options.map(
      (option): preact.JSX.Element => {
        const passProps = omit(props, ['name', 'options', 'defaultValue', 'max', 'onChange']);
        option = this.normalizeOption(option);
        return (
          <Checkbox
            {...passProps}
            value={option.value}
            iconNode={option.iconNode}
            disabled={option.disabled}
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
