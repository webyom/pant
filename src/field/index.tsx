import * as preact from 'preact';
import { isDef } from '../utils';
import { createBEM } from '../utils/bem';
import { Icon } from '../icon';
import { Cell, CellProps } from '../cell';
import { Checkbox, CheckboxProps } from '../checkbox';
import { Switch, SwitchProps } from '../switch';
import './index.scss';

export type ValidatorFn<T> = (value: T) => Promise<string | void>;

export type ValidateTrigger = 'blur' | 'change';

export type PatternValidator = {
  readonly trigger?: ValidateTrigger[];
  readonly pattern: string | RegExp;
  readonly message: string;
};

export type FnValidator<T> = {
  readonly trigger?: ValidateTrigger[];
  readonly validator: ValidatorFn<T>;
};

export type ValidateRule<T> = PatternValidator | FnValidator<T> | ValidatorFn<T>;

export type FieldProps<T> = Omit<CellProps, 'onClick'> & {
  type?:
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'digit'
    | 'email'
    | 'file'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'search'
    | 'switch'
    | 'tel'
    | 'text'
    | 'textarea'
    | 'time'
    | 'url'
    | 'week';
  name: string;
  defaultValue?: T;
  rules?: ValidateRule<T>[] | ValidatorFn<T>;
  disabled?: boolean;
  readonly?: boolean;
  autosize?: boolean | { minHeight: number; maxHeight: number };
  button?: preact.VNode;
  icon?: string | preact.VNode;
  rightIcon?: string | preact.VNode;
  clearable?: boolean;
  formatter?: Function;
  maxlength?: number | string;
  labelWidth?: number | string;
  labelClass?: null;
  labelAlign?: 'center' | 'right';
  inputAlign?: 'center' | 'right';
  placeholder?: string;
  errorMessage?: string;
  errorMessageAlign?: 'center' | 'right';
  showWordLimit?: boolean;
  validateTrigger?: ValidateTrigger[];
};

type FieldState<T> = {
  isInputType: boolean;
  focused: boolean;
  value: T;
  validateMessage: string;
  prevProps: FieldProps<T>;
};

const bem = createBEM('pant-field');

function isFnValidatorType<T>(type: PatternValidator | FnValidator<T>): type is FnValidator<T> {
  return typeof (type as FnValidator<T>).validator === 'function';
}

function isInputType(type: string, children: preact.ComponentChildren): boolean {
  return (!type && !children) || (!!type && !['checkbox', 'switch'].includes(type));
}

const NO_MATCHED_RULE_FLAG = '__NO_MATCHED_RULE_FLAG__';

export class Field<T = never> extends preact.Component<FieldProps<T>, FieldState<T>> {
  private readonly inputRef = preact.createRef();

  constructor(props: preact.RenderableProps<FieldProps<T>>) {
    super(props);
    this.state = {
      isInputType: isInputType(props.type, props.children),
      focused: false,
      value: props.defaultValue,
      validateMessage: '',
      prevProps: props,
    };
  }

  static getDerivedStateFromProps<T>(
    props: preact.RenderableProps<FieldProps<T>>,
    state: FieldState<T>,
  ): FieldState<T> {
    const defaultValueChanged = props.defaultValue !== state.prevProps.defaultValue;
    return {
      isInputType: isInputType(props.type, props.children),
      focused: state.focused,
      value: defaultValueChanged ? props.defaultValue : state.value,
      validateMessage: defaultValueChanged ? '' : state.validateMessage,
      prevProps: props,
    };
  }

  componentDidMount(): void {
    this.adjustSize();
  }

  componentDidUpdate(): void {
    this.adjustSize();
  }

  private get showClear(): boolean {
    const { clearable, readonly } = this.props;
    const { isInputType, focused, value } = this.state;
    return isInputType && clearable && !readonly && focused && ((value as unknown) as string) !== '' && isDef(value);
  }

  private get showError(): boolean {
    const { errorMessage } = this.props;
    const { validateMessage } = this.state;
    return !!validateMessage || !!errorMessage;
  }

  getName(): string {
    return this.props.name;
  }

  getValue(): T {
    const { type } = this.props;
    const { isInputType, value } = this.state;

    if (this.isCustomChild()) {
      return this.inputRef.current.getValue();
    } else if (isInputType) {
      return value;
    } else if (type === 'checkbox' || type === 'switch') {
      return (!!value as unknown) as T;
    }
  }

  private isCustomChild(): boolean {
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
    this.setState({ focused: false }, () => {
      this.validateWithTrigger('blur').then(msg => {
        msg === NO_MATCHED_RULE_FLAG || this.setState({ validateMessage: msg || '' });
      });
    });
  }

  private onCustomChange(): void {
    this.validateWithTrigger('change').then(msg => {
      msg === NO_MATCHED_RULE_FLAG || this.setState({ validateMessage: msg || '' });
    });
  }

  private onInputChange(evt: Event): void {
    this.setState({ value: (evt.target as HTMLInputElement).value as any }, () => {
      this.validateWithTrigger('change').then(msg => {
        msg === NO_MATCHED_RULE_FLAG || this.setState({ validateMessage: msg || '' });
      });
    });
  }

  private onCheckboxClick(evt: Event, props: CheckboxProps): void {
    this.setState({ value: (!props.checked as unknown) as T }, () => {
      this.validateWithTrigger('change').then(msg => {
        msg === NO_MATCHED_RULE_FLAG || this.setState({ validateMessage: msg || '' });
      });
    });
  }

  private onSwitchClick(evt: Event, props: SwitchProps): void {
    this.setState({ value: (!props.on as unknown) as T }, () => {
      this.validateWithTrigger('change').then(msg => {
        msg === NO_MATCHED_RULE_FLAG || this.setState({ validateMessage: msg || '' });
      });
    });
  }

  private clearInput(): void {
    const value: any = '';
    this.setState({ value });
  }

  private adjustSize(): void {
    const input = this.inputRef.current;
    const { type, autosize } = this.props;
    if (!(type === 'textarea' && autosize) || !input) {
      return;
    }

    input.style.height = 'auto';

    let height = input.scrollHeight;
    if (typeof autosize === 'object') {
      const { maxHeight, minHeight } = autosize;
      if (maxHeight) {
        height = Math.min(height, maxHeight);
      } else if (minHeight) {
        height = Math.max(height, minHeight);
      }
    }

    if (height) {
      input.style.height = height + 'px';
    }
  }

  private async validateWithTrigger(trigger: ValidateTrigger): Promise<string | void> {
    const { validateTrigger = [], rules } = this.props;
    if (typeof rules === 'function') {
      if (validateTrigger.includes(trigger)) {
        return this.validate(rules);
      }
    } else if (rules && rules.length) {
      const matchedRules = rules.filter(rule => {
        if (typeof rule === 'function') {
          return validateTrigger.includes(trigger);
        } else {
          return (
            (rule.trigger && rule.trigger.includes(trigger)) || (!rule.trigger && validateTrigger.includes(trigger))
          );
        }
      });
      if (matchedRules.length) {
        return this.validate(matchedRules);
      }
    }
    return NO_MATCHED_RULE_FLAG;
  }

  private async validate(rules?: ValidateRule<T>[] | ValidatorFn<T>): Promise<string | void> {
    const { type, rules: propRules } = this.props;
    rules = rules || propRules;
    if (rules) {
      const value = this.getValue();
      if (typeof rules === 'function') {
        return rules(value);
      } else if (rules.length) {
        return rules.reduce(async (promise, rule) => {
          return promise.then(msg => {
            if (msg) {
              return msg;
            } else {
              if (typeof rule === 'function') {
                return rule(value);
              } else if (isFnValidatorType<T>(rule)) {
                return rule.validator(value);
              } else {
                if (typeof rule.pattern === 'string') {
                  if (rule.pattern === 'required') {
                    if (type === 'checkbox' || type === 'switch') {
                      if (!value) {
                        return rule.message;
                      }
                    } else {
                      if (!isDef(value) || (typeof value === 'string' && value.trim() === '')) {
                        return rule.message;
                      }
                    }
                  }
                } else {
                  if (isDef(value) && !rule.pattern.test(value + '')) {
                    return rule.message;
                  }
                }
              }
            }
          });
        }, Promise.resolve(''));
      }
    }
  }

  async doValidate(): Promise<string | void> {
    return this.validate().then(msg => {
      this.setState({ validateMessage: msg || '' });
      return msg;
    });
  }

  genInput(): preact.JSX.Element {
    const { props } = this;
    const { type, name, inputAlign, children } = props;
    const { isInputType, value } = this.state;

    if (this.isCustomChild()) {
      const childrenWithProps = []
        .concat(children)
        .map(child => preact.cloneElement(child, { ref: this.inputRef, onChange: this.onCustomChange.bind(this) }));
      return <div class={bem('control', [inputAlign, 'custom'])}>{childrenWithProps}</div>;
    }

    if (isInputType) {
      const inputProps = {
        value: isDef(value) ? value + '' : '',
        class: bem('control', inputAlign),
        name: name,
        disabled: props.disabled,
        readonly: props.readonly,
        placeholder: props.placeholder,
        onFocus: this.onFocus.bind(this),
        onBlur: this.onBlur.bind(this),
        onChange: this.onInputChange.bind(this),
        ref: this.inputRef,
      };

      if (type === 'textarea') {
        return <textarea rows={1} {...inputProps} />;
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
    } else if (type === 'checkbox') {
      return (
        <div class={bem('control', [inputAlign, 'custom'])}>
          <Checkbox name={name} shape="square" checked={!!value} onClick={this.onCheckboxClick.bind(this)}></Checkbox>
        </div>
      );
    } else if (type === 'switch') {
      return (
        <div class={bem('control', [inputAlign, 'custom'])}>
          <Switch name={name} size="20" on={!!value} onClick={this.onSwitchClick.bind(this)}></Switch>
        </div>
      );
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
    const { validateMessage } = this.state;
    const message = validateMessage || errorMessage;
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
        className={bem({
          error: this.showError,
          disabled: props.disabled,
          'min-height': props.type === 'textarea' && !props.autosize,
        })}
        titleClassName={bem('title')}
        valueClassName={bem('value')}
      >
        <div className={bem('body')}>
          {this.genInput()}
          {this.showClear && <Icon name="clear" className={bem('clear')} onTouchStart={this.clearInput.bind(this)} />}
          {this.genRightIcon()}
          {props.button && <div class={bem('button')}>{props.button}</div>}
        </div>
        {this.genWordLimit()}
        {this.genMessage()}
      </Cell>
    );
  }
}
