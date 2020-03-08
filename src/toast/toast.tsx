import * as preact from 'preact';
import clsx from 'clsx';
import { Overlay } from '../overlay';
import { Transition } from '../transition';
import { preventDefaultAndStopPropagation } from '../utils/event';
import { isDef } from '../utils';
import { createBEM } from '../utils/bem';
import { Icon } from '../icon';
import { Loading, LoadingType } from '../loading';
import './index.scss';

export type ToastPosition = 'top' | 'middle' | 'bottom';

export type ToastProps = {
  show?: boolean;
  zIndex?: number | string;
  message: string;
  icon?: string;
  html?: boolean;
  className?: string;
  overlay?: boolean;
  iconPrefix?: string;
  position?: ToastPosition;
  loading?: boolean;
  loadingType?: LoadingType;
  closeOnClick?: boolean;
  onClosed?(): void;
  onOpened?(): void;
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
  const { show, zIndex, overlay } = props;

  return (
    <preact.Fragment>
      {overlay ? <Overlay zIndex={zIndex} customStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} show={show} /> : null}
      <Transition
        name="fade"
        stage={show ? 'enter' : 'leave'}
        onAfterEnter={show ? props.onOpened : null}
        onAfterLeave={show ? null : props.onClosed}
      >
        <div
          className={clsx(
            bem([props.position, { [props.html ? 'html' : 'text']: !props.icon && !props.loading }]),
            props.className,
          )}
          style={{ zIndex: zIndex }}
          onTouchMove={overlay ? preventDefaultAndStopPropagation : null}
          onClick={props.onClick}
        >
          {genIcon(props)}
          {genMessage(props)}
        </div>
      </Transition>
    </preact.Fragment>
  );
}

Toast.defaultProps = {
  html: false,
  overlay: false,
  loading: false,
  position: 'middle',
};
