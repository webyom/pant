import * as preact from 'preact';
import { Icon } from '../icon';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type CheckboxProps = {
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  iconSize?: number | string;
  checkedColor?: string;
  labelPosition?: 'left' | 'right';
  labelDisabled?: boolean;
  role?: 'checkbox' | 'radio';
  shape?: 'square' | 'round';
  direction?: 'horizontal' | 'vertical';
  iconNode?: preact.VNode;
  children?: string;
  onClick?(event: Event, props: CheckboxProps): void;
};

const bem = createBEM('pant-checkbox');

export function Checkbox(props: CheckboxProps): preact.JSX.Element {
  function iconStyle(): Record<string, string> {
    const checkedColor = props.checkedColor;

    if (checkedColor && props.checked && !props.disabled) {
      return {
        borderColor: checkedColor,
        backgroundColor: checkedColor,
      };
    }
  }

  function genIcon(): preact.JSX.Element {
    const { checked, iconSize } = props;

    return (
      <div
        class={bem('icon', [props.shape, { disabled: props.disabled, checked }])}
        style={{ fontSize: addUnit(iconSize) }}
      >
        {props.iconNode || <Icon name="success" style={iconStyle()} />}
      </div>
    );
  }

  function genLabel(): preact.JSX.Element {
    if (props.children) {
      return <span class={bem('label', [props.labelPosition, { disabled: props.disabled }])}>{props.children}</span>;
    }
  }

  function tabindex(): number {
    if (props.disabled || (props.role === 'radio' && !props.checked)) {
      return -1;
    }

    return 0;
  }

  function onClick(event: Event): void {
    if (props.disabled) {
      return;
    }
    props.onClick && props.onClick(event, props);
  }

  const Children = [genIcon()];

  if (props.labelPosition === 'left') {
    Children.unshift(genLabel());
  } else {
    Children.push(genLabel());
  }

  return (
    <div
      role={props.role}
      class={bem([
        {
          disabled: props.disabled,
          'label-disabled': props.labelDisabled,
        },
        props.direction,
      ])}
      tabIndex={tabindex()}
      aria-checked={String(props.checked)}
      onClick={onClick}
    >
      {Children}
    </div>
  );
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  labelPosition: 'right',
  role: 'checkbox',
  shape: 'round',
  direction: 'vertical',
};
