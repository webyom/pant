import * as preact from 'preact';
import { Icon } from '../icon';
import { isDef } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type CellProps = {
  icon?: string | preact.VNode;
  title?: string | preact.VNode | Array<string | preact.VNode>;
  label?: string | preact.VNode | Array<string | preact.VNode>;
  rightIcon?: string | preact.VNode;
  large?: boolean;
  border?: boolean;
  center?: boolean;
  required?: boolean;
  children?: string | preact.VNode | Array<string | preact.VNode>;
  onClick?(event: Event): void;
};

const bem = createBEM('pant-cell');

export function Cell(props: CellProps): preact.JSX.Element {
  const { icon, title, label, rightIcon } = props;
  const showTitle = isDef(title);

  function Label(): preact.JSX.Element {
    if (isDef(label)) {
      return <div className={bem('label')}>{label}</div>;
    }
  }

  function Title(): preact.JSX.Element {
    if (showTitle) {
      return (
        <div className={bem('title')}>
          {typeof title === 'string' ? <span>{title}</span> : title}
          {Label()}
        </div>
      );
    }
  }

  function Value(): preact.JSX.Element {
    return <div className={bem('value', { alone: !showTitle })}>{props.children}</div>;
  }

  function LeftIcon(): preact.JSX.Element {
    if (typeof icon === 'string') {
      return <Icon className={bem('left-icon')} name={icon} />;
    } else if (icon) {
      return icon;
    }
  }

  function RightIcon(): preact.JSX.Element {
    if (typeof rightIcon === 'string') {
      return <Icon className={bem('right-icon')} name={rightIcon} />;
    } else if (rightIcon) {
      return rightIcon;
    }
  }

  function onClick(event: Event): void {
    props.onClick && props.onClick(event);
  }

  const clickable = !!props.onClick;

  const classes: Record<string, string | boolean> = {
    clickable,
    large: props.large,
    center: props.center,
    required: props.required,
    borderless: !props.border,
  };

  return (
    <div class={bem(classes)} role={clickable ? 'button' : null} tabIndex={clickable ? 0 : null} onClick={onClick}>
      {LeftIcon()}
      {Title()}
      {Value()}
      {RightIcon()}
    </div>
  );
}

Cell.defaultProps = {
  border: true,
};
