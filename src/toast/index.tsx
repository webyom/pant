import * as preact from 'preact';
import { Toast, ToastProps } from './toast';
import { Z_INDEX_TOAST } from '../utils/constant';
import './index.scss';

export { Toast, ToastProps, ToastPosition } from './toast';

export type ToastOptions = ToastProps & {
  duration?: number;
  clearOnClick?: boolean;
};

export type ToastReturn = {
  clear(): void;
  setMessage(message: string): void;
};

const toastReturnList: ToastReturn[] = [];

let zIndexNext = Z_INDEX_TOAST;

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
    } else if (opt.clearOnClick) {
      res.clear();
    }
  };

  const zIndex = zIndexNext;

  const res: ToastReturn = {
    clear(): void {
      if (!container) {
        return;
      }
      preact.render(
        <Toast
          {...opt}
          message={message}
          zIndex={zIndex}
          onClick={onClick}
          onClosed={function(): void {
            document.body.removeChild(container);
            container = null;
            opt.onClosed && opt.onClosed();
          }}
        />,
        container,
      );
      const index = toastReturnList.indexOf(res);
      index >= 0 && toastReturnList.splice(index, 1);
      if (!toastReturnList.length) {
        zIndexNext = Z_INDEX_TOAST;
      }
    },

    setMessage(msg: string): void {
      if (!container) {
        return;
      }
      message = msg;
      preact.render(<Toast {...opt} message={message} zIndex={zIndex} onClick={onClick} show />, container);
    },
  };

  toastReturnList.push(res);

  document.body.appendChild(container);
  preact.render(<Toast {...opt} zIndex={zIndex} onClick={onClick} show />, container);

  if (opt.duration !== 0) {
    setTimeout(res.clear, opt.duration > 0 ? opt.duration : opt.loading ? 60 * 1000 : 2000);
  }

  zIndexNext++;

  return res;
}

export function clearAllToasts(): void {
  toastReturnList.forEach(item => item.clear());
}
