import * as preact from 'preact';
import { Overlay } from '../overlay';
import { Transition } from '../transition';
import { Toast, ToastProps } from './toast';
import { preventDefaultAndStopPropagation } from '../utils/event';
import './index.scss';

export { Toast };

export type ToastOptions = ToastProps & {
  duration?: number;
  overlay?: boolean;
  closeOnClick?: boolean;
  onClosed?(): void;
  onOpened?(): void;
};

export type ToastReturn = {
  clear(): void;
  setMessage(message: string): void;
};

const toastReturnList: ToastReturn[] = [];

export function toast(options: string | ToastOptions): ToastReturn {
  let opt: ToastOptions;
  if (typeof options === 'string') {
    opt = { message: options };
  } else {
    opt = options;
  }
  let message = opt.message;

  let container = document.createElement('div');
  container.className = 'pant-toast-container';

  const onClick = function(event: Event): void {
    if (opt.onClick) {
      opt.onClick(event);
    } else if (opt.closeOnClick) {
      res.clear();
    }
  };

  const res: ToastReturn = {
    clear(): void {
      if (!container) {
        return;
      }
      preact.render(
        <preact.Fragment>
          {opt.overlay ? <Overlay customStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} show={false} /> : null}
          <Transition
            name="fade"
            stage="leave"
            onAfterLeave={function(): void {
              document.body.removeChild(container);
              container = null;
              opt.onClosed && opt.onClosed();
            }}
          >
            <div onTouchMove={opt.overlay ? preventDefaultAndStopPropagation : null}>
              <Toast {...opt} message={message} onClick={onClick} />
            </div>
          </Transition>
          ,
        </preact.Fragment>,
        container,
      );
      const index = toastReturnList.indexOf(res);
      index >= 0 && toastReturnList.splice(index, 1);
    },

    setMessage(msg: string): void {
      if (!container) {
        return;
      }
      message = msg;
      preact.render(
        <preact.Fragment>
          {opt.overlay ? <Overlay customStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} show /> : null}
          <Transition name="fade" stage="enter">
            <div onTouchMove={opt.overlay ? preventDefaultAndStopPropagation : null}>
              <Toast {...opt} message={message} onClick={onClick} />
            </div>
          </Transition>
        </preact.Fragment>,
        container,
      );
    },
  };

  toastReturnList.push(res);

  document.body.appendChild(container);
  preact.render(
    <preact.Fragment>
      {opt.overlay ? <Overlay customStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} show /> : null}
      <Transition name="fade" stage="enter" onAfterEnter={opt.onOpened}>
        <div onTouchMove={opt.overlay ? preventDefaultAndStopPropagation : null}>
          <Toast {...opt} onClick={onClick} />
        </div>
      </Transition>
    </preact.Fragment>,
    container,
  );

  if (opt.duration !== 0) {
    setTimeout(res.clear, opt.duration > 0 ? opt.duration : opt.loading ? 60 * 1000 : 2000);
  }

  return res;
}

export function clearAllToasts(): void {
  toastReturnList.forEach(item => item.clear());
}
