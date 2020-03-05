import * as preact from 'preact';
import { Overlay } from '../overlay';
import { Transition } from '../transition';
import { Toast, ToastProps } from './toast';
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

export function toast(options: string | ToastOptions): ToastReturn {
  let opt: ToastOptions;
  if (typeof options === 'string') {
    opt = { message: options };
  } else {
    opt = options;
  }

  let container = document.createElement('div');
  container.className = 'pant-toast-container';

  const onClick = function(event: Event): void {
    if (opt.onClick) {
      opt.onClick(event);
    } else if (opt.closeOnClick) {
      res.clear();
    }
  };

  const res = {
    clear(): void {
      if (!container) {
        return;
      }
      preact.render(
        <Transition
          type="fade"
          stage="leave"
          onAfterLeave={function(): void {
            document.body.removeChild(container);
            container = null;
            opt.onClosed && opt.onClosed();
          }}
        >
          <div>
            <Toast {...opt} onClick={onClick} />
          </div>
        </Transition>,
        container,
      );
    },

    setMessage(message: string): void {
      if (!container) {
        return;
      }
      if (opt.overlay) {
        preact.render(
          <Overlay customStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} show>
            <Toast {...opt} message={message} onClick={onClick} />
          </Overlay>,
          container,
        );
      } else {
        preact.render(<Toast {...opt} message={message} onClick={onClick} />, container);
      }
    },
  };

  document.body.appendChild(container);
  if (opt.overlay) {
    preact.render(
      <Overlay customStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} onAfterEnter={opt.onOpened} show>
        <Toast {...opt} onClick={onClick} />
      </Overlay>,
      container,
    );
  } else {
    preact.render(
      <Transition type="fade" stage="enter" onAfterEnter={opt.onOpened}>
        <div>
          <Toast {...opt} onClick={onClick} />
        </div>
      </Transition>,
      container,
    );
  }

  if (opt.duration !== 0) {
    setTimeout(res.clear, opt.duration > 0 ? opt.duration : opt.loading ? 60 * 1000 : 2000);
  }

  return res;
}
