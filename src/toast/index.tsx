import * as preact from 'preact';
import { Toast, ToastProps } from './toast';
import './index.scss';

export type ToastOptions = ToastProps & {
  duration?: number;
  closeOnClick?: boolean;
  onClosed?(): void;
  onOpened?(): void;
};

export type ToastReturn = {
  clear(): void;
  setMessage(message: string): void;
};

export { Toast };

export function toast(opt: ToastOptions): ToastReturn {
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
      preact.render(null, container);
      document.body.removeChild(container);
      container = null;
      opt.onClosed && opt.onClosed();
    },
    setMessage(message: string): void {
      if (!container) {
        return;
      }
      preact.render(<Toast {...opt} message={message} onClick={onClick} />, container);
    },
  };
  document.body.appendChild(container);
  preact.render(<Toast {...opt} onClick={onClick} />, container);
  if (opt.duration !== 0) {
    setTimeout(res.clear, opt.duration > 0 ? opt.duration : opt.loading ? 60 * 1000 : 2000);
  }
  opt.onOpened && opt.onOpened();
  return res;
}
