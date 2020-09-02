import * as preact from 'preact';
import { Cell } from '../cell';
import { CellGroup, CellGroupProps } from '../cell-group';
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
  cellGroup?: boolean | CellGroupProps;
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
  bindedOnClick = this.onClick.bind(this);
  state = {
    value: this.props.defaultValue,
  };

  getValue(): string[] {
    return this.state.value;
  }

  toggleAll(on?: boolean): void {
    const oldValue = this.state.value;
    const { options } = this.props;
    let newValue: string[];
    if (on) {
      newValue = options.map((option): string => {
        return this.normalizeOption(option).value;
      });
      if (
        newValue.every(function(value): boolean {
          return oldValue.includes(value);
        })
      ) {
        return;
      }
    } else {
      if (!oldValue.length) {
        return;
      }
      newValue = [];
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
      if (props.role === 'radio') {
        return;
      }
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

  private onCellClick(checkboxProps: CheckboxProps, event: Event): void {
    this.onClick(event, checkboxProps);
  }

  private genOption(option: CheckboxGroupOption, passProps: CheckboxProps): preact.JSX.Element {
    const props = this.props;
    const stateValue = this.state.value;

    option = this.normalizeOption(option);
    const label = option.label;
    option = { ...option, label: '' };

    const checkboxProps = {
      ...passProps,
      value: option.value,
      iconNode: props.iconNode,
      activeIconNode: props.activeIconNode,
      inactiveIconNode: props.inactiveIconNode,
      disabled: isDef(option.disabled) ? option.disabled : props.disabled,
      checked: stateValue.includes(option.value),
    };

    if (props.cellGroup) {
      return (
        <Cell
          title={label}
          rightIcon={<Checkbox {...checkboxProps}>{option.label}</Checkbox>}
          onClick={this.onCellClick.bind(this, checkboxProps)}
        ></Cell>
      );
    }

    return (
      <Checkbox {...checkboxProps} onClick={this.bindedOnClick}>
        {label}
      </Checkbox>
    );
  }

  private genOptions(): preact.JSX.Element | preact.JSX.Element[] {
    const props = this.props;
    const { options } = props;

    const passProps = omit(props, ['name', 'options', 'defaultValue', 'max', 'onClick', 'onChange', 'onMaxLimit']);

    if (props.cellGroup) {
      return <CellGroup {...props.cellGroup}>{options.map(option => this.genOption(option, passProps))}</CellGroup>;
    }

    return options.map(option => this.genOption(option, passProps));
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
