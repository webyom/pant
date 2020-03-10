import * as preact from 'preact';
import { Popup, PopupProps } from '../popup';
import { createBEM } from '../utils/bem';
import './index.scss';

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning';

export type NotifyProps = PopupProps & {
  message: string;
  type?: NotifyType;
  color?: string;
  background?: string;
  onClick?(event: Event): void;
};

const bem = createBEM('pant-notify');

export function Notify(props: NotifyProps): preact.JSX.Element {
  const style = {
    color: props.color,
    background: props.background,
  };

  return (
    <Popup
      show={props.show}
      customStyle={style}
      zIndex={props.zIndex}
      position="top"
      overlay={false}
      duration={0.2}
      lockScroll={false}
      className={bem([props.type])}
      onClick={props.onClick}
      onOpened={props.onOpened}
      onClosed={props.onClosed}
    >
      {props.message}
    </Popup>
  );
}

Notify.defaultProps = {
  type: 'danger',
};
