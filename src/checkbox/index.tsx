import * as preact from 'preact';
import { Icon } from '../icon';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type CheckboxProps = {
  value?: any;
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
};

const bem = createBEM('pant-checkbox');

export class Checkbox extends preact.Component<CheckboxProps> {
  iconStyle(): Record<string, string> {
    const props = this.props;
    const checkedColor = props.checkedColor;

    if (checkedColor && props.checked && !props.disabled) {
      return {
        borderColor: checkedColor,
        backgroundColor: checkedColor,
      };
    }
  }

  genIcon(): preact.JSX.Element {
    const props = this.props;
    const { checked, iconSize } = props;

    return (
      <div
        class={bem('icon', [props.shape, { disabled: props.disabled, checked }])}
        style={{ fontSize: addUnit(iconSize) }}
      >
        {props.iconNode || <Icon name="success" style={this.iconStyle()} />}
      </div>
    );
  }

  genLabel(): preact.JSX.Element {
    const props = this.props;

    if (props.children) {
      return <span class={bem('label', [props.labelPosition, { disabled: props.disabled }])}>{props.children}</span>;
    }
  }

  tabindex(): number {
    const props = this.props;

    if (props.disabled || (props.role === 'radio' && !props.checked)) {
      return -1;
    }

    return 0;
  }

  onClick(): void {
    //
  }

  render(): preact.JSX.Element {
    const props = this.props;
    const Children = [this.genIcon()];

    if (props.labelPosition === 'left') {
      Children.unshift(this.genLabel());
    } else {
      Children.push(this.genLabel());
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
        tabIndex={this.tabindex()}
        aria-checked={String(props.checked)}
        onClick={this.onClick.bind(this)}
      >
        {Children}
      </div>
    );
  }
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  labelPosition: 'right',
  role: 'checkbox',
  shape: 'round',
  direction: 'vertical',
};
