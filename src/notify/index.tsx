import * as preact from 'preact';
import { Notify, NotifyProps, NotifyType } from './notify';
import './index.scss';

export { Notify, NotifyProps } from './notify';

export type NotifyOptions = NotifyProps & {
  duration?: number;
  clearOnClick?: boolean;
};

export type NotifyReturn = {
  clear(): void;
  setMessage(message: string): void;
};

const notifyReturnList: NotifyReturn[] = [];

export function notify(options: string | NotifyOptions, type?: NotifyType): NotifyReturn {
  let opt: NotifyOptions;
  if (typeof options === 'string') {
    opt = { message: options };
  } else {
    opt = options;
  }
  if (type) {
    opt.type = type;
  }
  let message = opt.message;

  let container = document.createElement('div');
  container.className = 'pant-notify-container';

  const onClick = function(event: Event): void {
    if (opt.onClick) {
      opt.onClick(event);
    } else if (opt.clearOnClick) {
      res.clear();
    }
  };

  const res: NotifyReturn = {
    clear(): void {
      if (!container) {
        return;
      }
      preact.render(
        <Notify
          {...opt}
          message={message}
          onClick={onClick}
          onClosed={function(): void {
            document.body.removeChild(container);
            container = null;
            opt.onClosed && opt.onClosed();
          }}
        />,
        container,
      );
      const index = notifyReturnList.indexOf(res);
      index >= 0 && notifyReturnList.splice(index, 1);
    },

    setMessage(msg: string): void {
      if (!container) {
        return;
      }
      message = msg;
      preact.render(<Notify {...opt} message={message} onClick={onClick} show />, container);
    },
  };

  notifyReturnList.push(res);

  document.body.appendChild(container);
  preact.render(<Notify {...opt} onClick={onClick} show />, container);

  if (opt.duration !== 0) {
    setTimeout(res.clear, opt.duration > 0 ? opt.duration : 2000);
  }

  return res;
}

export function clearAllNotifies(): void {
  notifyReturnList.forEach(item => item.clear());
}
