import * as preact from 'preact';
import clsx from 'clsx';
import { Overlay } from '../overlay';
import { Transition } from '../transition';
import { preventDefaultAndStopPropagation } from '../utils/event';
import { isDef, getIncrementalZIndex } from '../utils';
import { createBEM } from '../utils/bem';
import { Z_INDEX_TOAST_BASE } from '../utils/constant';
import { Icon } from '../icon';
import { Loading, LoadingType } from '../loading';
import './index.scss';

export type ToastPosition = 'top' | 'middle' | 'bottom';
export type ToastTextAlign = 'left' | 'center' | 'right';

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
  textAlign?: ToastTextAlign;
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

export const Toast: preact.FunctionalComponent<ToastProps> = props => {
  const { show, zIndex, overlay } = props;
  const incZIndex = zIndex || getIncrementalZIndex(Z_INDEX_TOAST_BASE);

  return (
    <preact.Fragment>
      {overlay ? (
        <Overlay zIndex={incZIndex} customStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} show={show} />
      ) : null}
      <Transition
        name="fade"
        stage={show ? 'enter' : 'leave'}
        onAfterEnter={show ? props.onOpened : null}
        onAfterLeave={show ? null : props.onClosed}
      >
        <div
          className={clsx(
            bem([
              props.position,
              `align-${props.textAlign}`,
              { [props.html ? 'html' : 'text']: !props.icon && !props.loading },
            ]),
            props.className,
          )}
          style={{ zIndex: incZIndex }}
          onTouchMove={overlay ? preventDefaultAndStopPropagation : null}
          onClick={props.onClick}
        >
          {genIcon(props)}
          {genMessage(props)}
        </div>
      </Transition>
    </preact.Fragment>
  );
};

Toast.defaultProps = {
  html: false,
  overlay: false,
  loading: false,
  position: 'middle',
  textAlign: 'center',
};
