import * as preact from 'preact';
import clsx from 'clsx';
import { BORDER_SURROUND, WHITE } from '../utils/constant';
import { createBEM } from '../utils/bem';
import { Icon } from '../icon';
import { Loading, LoadingType } from '../loading';
import './index.scss';

export type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger';

export type ButtonSize = 'large' | 'normal' | 'small' | 'mini';

export type ButtonProps = {
  type?: ButtonType;
  size?: ButtonSize;
  url?: string;
  text?: string;
  icon?: string;
  color?: string;
  block?: boolean;
  plain?: boolean;
  round?: boolean;
  square?: boolean;
  loading?: boolean;
  hairline?: boolean;
  disabled?: boolean;
  targetBlank?: boolean;
  nativeType?: string;
  loadingSize?: number | string;
  loadingType?: LoadingType;
  loadingText?: string;
  className?: string;
  style?: Record<string, string | number>;
  onClick?(event: Event): void;
};

const bem = createBEM('pant-button');

export const Button: preact.FunctionalComponent<ButtonProps> = props => {
  const { url, icon, type, color, plain, disabled, loading, hairline, loadingText } = props;

  let style: Record<string, string | number> = {};

  if (color) {
    style.color = plain ? color : WHITE;

    if (!plain) {
      // Use background instead of backgroundColor to make linear-gradient work
      style.background = color;
    }

    // hide border when color is linear-gradient
    if (color.indexOf('gradient') !== -1) {
      style.border = 0;
    } else {
      style.borderColor = color;
    }
  }

  style = { ...style, ...props.style };

  function onClick(event: Event): void {
    if (!loading && !disabled && props.onClick) {
      props.onClick(event);
    }
  }

  const classes = [
    bem([
      type,
      props.size,
      {
        plain,
        loading,
        disabled,
        hairline,
        block: props.block,
        round: props.round,
        square: props.square,
      },
    ]),
    { [BORDER_SURROUND]: hairline },
    props.className,
  ];

  function Content(): preact.JSX.Element[] {
    const content = [];

    if (loading) {
      content.push(
        <Loading className={bem('loading')} size={props.loadingSize} type={props.loadingType} color="currentColor" />,
      );
    } else if (icon) {
      content.push(<Icon name={icon} className={bem('icon')} />);
    }

    let text;
    if (loading) {
      text = loadingText;
    } else {
      text = props.children || props.text;
    }

    if (text) {
      content.push(<span class={bem('text')}>{text}</span>);
    }

    return content;
  }

  if (url) {
    return (
      <a
        href={url}
        style={style}
        className={clsx(classes)}
        disabled={disabled}
        target={props.targetBlank ? '_blank' : undefined}
      >
        {Content()}
      </a>
    );
  } else {
    return (
      <button style={style} className={clsx(classes)} type={props.nativeType} disabled={disabled} onClick={onClick}>
        {Content()}
      </button>
    );
  }
};

Button.defaultProps = {
  type: 'default',
  size: 'normal',
  loadingSize: '20px',
};
