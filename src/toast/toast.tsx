import * as preact from 'preact';
import clsx from 'clsx';
import { isDef } from '../utils';
import { createBEM } from '../utils/bem';
import { Icon } from '../icon';
import { Loading, LoadingType } from '../loading';
import './index.scss';

export type ToastPosition = 'top' | 'middle' | 'bottom';

export type ToastProps = {
  message: string;
  icon?: string;
  html?: boolean;
  className?: string;
  overlay?: boolean;
  iconPrefix?: string;
  position?: ToastPosition;
  loading?: boolean;
  loadingType?: LoadingType;
  onClick?(event: Event): void;
};

const bem = createBEM('pant-toast');

function genIcon(props: ToastProps): preact.JSX.Element {
  const { icon, iconPrefix, loading, loadingType } = props;

  if (loading) {
    return <Loading className={bem('loading')} type={loadingType} />;
  } else if (icon) {
    return <Icon className={bem('icon')} classPrefix={iconPrefix} name={icon} />;
  }
}

function genMessage(props: ToastProps): preact.JSX.Element {
  const { html, message } = props;

  if (!isDef(message) || message === '') {
    return;
  }

  if (html) {
    return <div class={bem('text')} dangerouslySetInnerHTML={{ __html: message }} />;
  }

  return <div class={bem('text')}>{message}</div>;
}

export function Toast(props: ToastProps): preact.JSX.Element {
  return (
    <div
      className={clsx(
        bem([props.position, { [props.html ? 'html' : 'text']: !props.icon && !props.loading }]),
        props.className,
      )}
      onClick={props.onClick}
    >
      {genIcon(props)}
      {genMessage(props)}
    </div>
  );
}

Toast.defaultProps = {
  html: false,
  overlay: false,
  loading: false,
  position: 'middle',
};
