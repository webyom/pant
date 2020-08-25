import * as preact from 'preact';
import clsx from 'clsx';
import { Popup, PopupProps } from '../popup';
import { Loading } from '../loading';
import { Icon } from '../icon';
import { createBEM } from '../utils/bem';
import { BORDER_TOP } from '../utils/constant';
import './index.scss';

export type ActionSheetItem = {
  name: string;
  value?: any;
  color?: string;
  subname?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export type ActionSheetProps = PopupProps & {
  title?: string;
  actions?: ActionSheetItem[];
  cancelText?: string;
  description?: string;
  onClosed?(): void;
  onOpened?(): void;
  onCancel?(event: Event): void;
  onSelect?(item: ActionSheetItem, index: number): void;
};

const bem = createBEM('pant-action-sheet');

export const ActionSheet: preact.FunctionalComponent<ActionSheetProps> = props => {
  const { show, title, cancelText } = props;

  function Header(): preact.JSX.Element {
    if (title) {
      return (
        <div class={bem('header')}>
          {title}
          <Icon name={props.closeIcon} className={bem('close')} onClick={props.onCancel} />
        </div>
      );
    }
  }

  function Content(): preact.JSX.Element {
    if (props.children) {
      return <div class={bem('content')}>{props.children}</div>;
    }
  }

  function Option(item: ActionSheetItem, index: number): preact.JSX.Element {
    const { disabled, loading } = item;

    function onClickOption(event: MouseEvent): void {
      event.stopPropagation();

      if (disabled || loading) {
        return;
      }

      props.onSelect && props.onSelect(item, index);
    }

    function OptionContent(): preact.JSX.Element | preact.JSX.Element[] {
      if (loading) {
        return <Loading size="20px" />;
      }

      return [
        <span class={bem('name')}>{item.name}</span>,
        item.subname && <span class={bem('subname')}>{item.subname}</span>,
      ];
    }

    return (
      <button
        type="button"
        className={clsx(bem('item', { disabled, loading }), item.className, BORDER_TOP)}
        style={{ color: item.color }}
        onClick={onClickOption}
      >
        {OptionContent()}
      </button>
    );
  }

  function CancelText(): preact.JSX.Element {
    if (cancelText) {
      return (
        <button type="button" class={bem('cancel')} onClick={props.onCancel}>
          {cancelText}
        </button>
      );
    }
  }

  const Description = props.description && <div class={bem('description')}>{props.description}</div>;

  return (
    <Popup
      className={bem()}
      show={show}
      position="bottom"
      round={props.round}
      overlay={props.overlay}
      duration={props.duration}
      lazyRender={props.lazyRender}
      closeOnClickOverlay={props.closeOnClickOverlay}
      safeAreaInsetBottom={props.safeAreaInsetBottom}
      onClickClose={props.onCancel}
      onOpened={show ? props.onOpened : null}
      onClosed={show ? null : props.onClosed}
    >
      {Header()}
      {Description}
      {props.actions && props.actions.map(Option)}
      {Content()}
      {CancelText()}
    </Popup>
  );
};

ActionSheet.defaultProps = {
  round: true,
  safeAreaInsetBottom: true,
  closeOnClickOverlay: true,
};
