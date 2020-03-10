import * as preact from 'preact';
import { ActionSheet, ActionSheetProps, ActionSheetItem } from './action-sheet';
import { Z_INDEX_ACTION_SHEET } from '../utils/constant';
import './index.scss';

export { ActionSheet, ActionSheetProps } from './action-sheet';

export type ActionSheetOptions = ActionSheetProps & {
  closeOnSelect?: boolean;
};

export type ActionSheetReturn = {
  close(): void;
};

const actionSheetReturnList: ActionSheetReturn[] = [];

let zIndexNext = Z_INDEX_ACTION_SHEET;

export function actionSheet(options: ActionSheetOptions): ActionSheetReturn {
  const opt = options;

  let container = document.createElement('div');
  container.className = 'pant-action-sheet-container';

  function onCancel(): void {
    res.close();
  }

  function onSelect(item: ActionSheetItem, index: number): void {
    if (opt.closeOnSelect !== false) {
      res.close();
    }
    opt.onSelect && opt.onSelect(item, index);
  }

  const zIndex = zIndexNext;

  const res: ActionSheetReturn = {
    close(): void {
      if (!container) {
        return;
      }
      preact.render(
        <ActionSheet
          {...opt}
          zIndex={zIndex}
          onCancel={opt.onCancel || onCancel}
          onSelect={onSelect}
          onClosed={function(): void {
            document.body.removeChild(container);
            container = null;
            opt.onClosed && opt.onClosed();
          }}
        />,
        container,
      );
      const index = actionSheetReturnList.indexOf(res);
      index >= 0 && actionSheetReturnList.splice(index, 1);
      if (!actionSheetReturnList.length) {
        zIndexNext = Z_INDEX_ACTION_SHEET;
      }
    },
  };

  actionSheetReturnList.push(res);

  document.body.appendChild(container);
  preact.render(
    <ActionSheet {...opt} zIndex={zIndex} onCancel={opt.onCancel || onCancel} onSelect={onSelect} show />,
    container,
  );

  zIndexNext++;

  return res;
}

export function closeAllactionSheets(): void {
  actionSheetReturnList.forEach(item => item.close());
}
