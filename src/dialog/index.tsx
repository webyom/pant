import * as preact from 'preact';
import { Dialog, DialogProps } from './dialog';
import './index.scss';

export { Dialog };

export type DialogOptions = DialogProps & {};

export type DialogReturn = {
  close(): void;
  update(newProps: DialogProps): void;
};

const dialogReturnList: DialogReturn[] = [];

export function dialog(options: string | DialogOptions): DialogReturn {
  let opt: DialogOptions;
  if (typeof options === 'string') {
    opt = { message: options };
  } else {
    opt = options;
  }
  let props: DialogProps;

  let container = document.createElement('div');
  container.className = 'pant-dialog-container';

  const onClick = function(): void {
    res.close();
  };

  const res: DialogReturn = {
    close(): void {
      if (!container) {
        return;
      }
      preact.render(
        <Dialog
          {...opt}
          {...props}
          onCancelClick={opt.onCancelClick || onClick}
          onConfirmClick={opt.onConfirmClick || onClick}
          onClosed={function(): void {
            document.body.removeChild(container);
            container = null;
            opt.onClosed && opt.onClosed();
          }}
        />,
        container,
      );
      const index = dialogReturnList.indexOf(res);
      index >= 0 && dialogReturnList.splice(index, 1);
    },

    update(newProps: DialogProps): void {
      if (!container) {
        return;
      }
      props = newProps;
      preact.render(
        <Dialog
          {...opt}
          {...props}
          onCancelClick={opt.onCancelClick || onClick}
          onConfirmClick={opt.onConfirmClick || onClick}
          show
        />,
        container,
      );
    },
  };

  dialogReturnList.push(res);

  document.body.appendChild(container);
  preact.render(
    <Dialog
      {...opt}
      onCancelClick={opt.onCancelClick || onClick}
      onConfirmClick={opt.onConfirmClick || onClick}
      show
    />,
    container,
  );

  return res;
}

export function closeAllDialogs(): void {
  dialogReturnList.forEach(item => item.close());
}
