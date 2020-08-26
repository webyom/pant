import * as preact from 'preact';
import { Icon } from '../icon';
import { isDef } from '../utils';
import { createBEM } from '../utils/bem';
import { Cell, CellProps } from '../cell';
import './index.scss';

export type FieldProps<T> = Omit<CellProps, 'onClick'> & {
  type?: 'text' | 'textarea' | 'number' | 'digit' | 'email' | 'tel' | 'password';
  name: string;
  defaultValue?: T;
  rules?: Array<any>;
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autosize?: boolean | { minHeight: number; maxHeight: number };
  icon?: string | preact.VNode;
  rightIcon?: string | preact.VNode;
  clearable?: boolean;
  formatter?: Function;
  maxlength?: number | string;
  labelWidth?: number | string;
  labelClass?: null;
  labelAlign?: string;
  inputAlign?: 'right';
  placeholder?: string;
  errorMessage?: string;
  errorMessageAlign?: string;
  showWordLimit?: boolean;
};

type FieldState<T> = {
  isInputType: boolean;
  focused: boolean;
  value: T;
  prevProps: FieldProps<T>;
};

const bem = createBEM('pant-field');

function isInputType(type: string): boolean {
  return !type || ['text', 'textarea', 'number', 'digit', 'email', 'tel', 'password'].includes(type);
}

export class Field<T = never> extends preact.Component<FieldProps<T>, FieldState<T>> {
  constructor(props: FieldProps<T>) {
    super(props);
    this.state = {
      isInputType: isInputType(props.type),
      focused: false,
      value: props.defaultValue,
      prevProps: props,
    };
  }

  static getDerivedStateFromProps<T>(props: FieldProps<T>, state: FieldState<T>): FieldState<T> {
    return {
      isInputType: isInputType(props.type),
      focused: state.focused,
      value: props.defaultValue === state.prevProps.defaultValue ? state.value : props.defaultValue,
      prevProps: props,
    };
  }

  private get showClear(): boolean {
    const { clearable, readonly } = this.props;
    const { isInputType, focused, value } = this.state;
    return isInputType && clearable && !readonly && focused && ((value as unknown) as string) !== '' && isDef(value);
  }

  getName(): string {
    return this.props.name;
  }

  getValue(): T {
    return this.state.value;
  }

  isCustomChild(): boolean {
    const { type, children } = this.props;
    if (!type && children) {
      return true;
    }
    return false;
  }

  private onFocus(): void {
    this.setState({ focused: true });
  }

  private onBlur(): void {
    this.setState({ focused: false });
  }

  private onInputChange(evt: Event): void {
    this.setState({ value: (evt.target as HTMLInputElement).value as any });
  }

  private clearInput(): void {
    const value: any = '';
    this.setState({ value });
  }

  genInput(): preact.JSX.Element {
    const { props } = this;
    const { type, inputAlign, children } = props;
    const { isInputType, value } = this.state;

    if (this.isCustomChild()) {
      return <div class={bem('control', [inputAlign, 'custom'])}>{children}</div>;
    }

    if (isInputType) {
      const inputProps = {
        value: value + '',
        class: bem('control', inputAlign),
        name: props.name,
        disabled: props.disabled,
        readonly: props.readonly,
        placeholder: props.placeholder,
        onFocus: this.onFocus.bind(this),
        onBlur: this.onBlur.bind(this),
        onChange: this.onInputChange.bind(this),
      };

      if (type === 'textarea') {
        return <textarea {...inputProps} />;
      }

      let inputType = type || 'text';
      let inputMode;

      // type="number" is weired in iOS, and can't prevent dot in Android
      // so use inputmode to set keyboard in mordern browers
      if (type === 'number') {
        inputType = 'text';
        inputMode = 'decimal';
      } else if (type === 'digit') {
        inputType = 'tel';
        inputMode = 'numeric';
      }

      return <input type={inputType} inputMode={inputMode} {...inputProps} />;
    }
  }

  genRightIcon(): preact.JSX.Element {
    const { rightIcon } = this.props;
    if (typeof rightIcon === 'string') {
      return <Icon name={rightIcon} />;
    } else if (rightIcon) {
      return rightIcon;
    }
  }

  genWordLimit(): preact.JSX.Element {
    const { showWordLimit, maxlength } = this.props;
    const { isInputType, value } = this.state;
    if (isInputType && showWordLimit && maxlength) {
      const count = ((value || '') as string).toString().length;
      const full = count >= maxlength;

      return (
        <div class={bem('word-limit')}>
          <span class={bem('word-num', { full })}>{count}</span>/{maxlength}
        </div>
      );
    }
  }

  genMessage(): preact.JSX.Element {
    const { errorMessage, errorMessageAlign } = this.props;
    const message = errorMessage;
    if (message) {
      return <div class={bem('error-message', errorMessageAlign)}>{message}</div>;
    }
  }

  render(): preact.JSX.Element {
    const { props } = this;
    return (
      <Cell
        label={props.label}
        title={props.title}
        icon={props.icon}
        center={props.center}
        border={props.border}
        required={props.required}
        className={bem()}
        titleClassName={bem('title')}
        valueClassName={bem('value')}
      >
        <div className={bem('body')}>
          {this.genInput()}
          {this.showClear && <Icon name="clear" className={bem('clear')} onTouchStart={this.clearInput.bind(this)} />}
          {this.genRightIcon()}
        </div>
        {this.genWordLimit()}
        {this.genMessage()}
      </Cell>
    );
  }
}
